import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { getErrorMessage } from '@/utils/errorHandler'
import { showErrorNotification } from '@/utils/notificationService'

// Extend the InternalAxiosRequestConfig interface to include a _retry property
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export function setupInterceptors(
  httpClient: AxiosInstance,
  authRepository: IAuthRepository
): void {
  // Request interceptor to add the authorization token to each request
  const requestInterceptorId = httpClient.interceptors.request.use(
    (config) => {
      const token = authRepository.getAccessToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor to handle errors in responses
  httpClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as ExtendedAxiosRequestConfig

      // If the error status is 401 and the error message is 'access token has expired'
      if (error.response?.status === 401 && getErrorMessage(error) === 'access token has expired') {
        if (originalRequest._retry) {
          authRepository.logout()
          return Promise.reject(error)
        }

        originalRequest._retry = true

        try {
          const refreshToken = authRepository.getRefreshToken()
          if (refreshToken != null) {
            // Eject the request interceptor temporarily
            httpClient.interceptors.request.eject(requestInterceptorId)

            // Temporarily set the Authorization header to use the refresh token
            httpClient.defaults.headers['Authorization'] = `Bearer ${refreshToken}`
            const newAccessToken = await authRepository.refreshToken()

            // Restore the request interceptor
            requestInterceptorId

            // Restore the original access token in the default headers
            httpClient.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`
            // Set the new access token for the original request
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

            return httpClient(originalRequest)
          }
        } catch (e) {
          authRepository.logout()
          return Promise.reject(e)
        }
      }

      // If the error status is 401 and the error message is 'refresh token is invalid', log out the user and reject the error
      if (error.response?.status === 401 && getErrorMessage(error) === 'refresh token is invalid') {
        authRepository.logout()
        return Promise.reject(error)
      }

      // If the error is not a 401 error, show an error notification and log the error to the console
      const errorMessage = getErrorMessage(error)
      showErrorNotification('Error', errorMessage)
      console.error('AxiosError failed', errorMessage)

      return Promise.reject(error)
    }
  )
}
