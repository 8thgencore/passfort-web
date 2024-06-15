import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { getErrorMessage } from '@/utils/errorHandler'
import { showErrorNotification } from '@/utils/notificationService'

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export function setupInterceptors(
  httpClient: AxiosInstance,
  authRepository: IAuthRepository
): void {
  // Request interceptor to add the authorization token to each request
  httpClient.interceptors.request.use(
    (config) => {
      const token = authRepository.getAccessToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor to handle errors in responses
  httpClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as ExtendedAxiosRequestConfig

      if (
        error.response?.status === 401 &&
        getErrorMessage(error) === 'access token has expired' &&
        originalRequest
      ) {
        if (originalRequest._retry) {
          authRepository.logout()
          return Promise.reject(error)
        }

        originalRequest._retry = true
        try {
          const refreshToken = authRepository.getRefreshToken()
          if (refreshToken != null) {
            httpClient.defaults.headers['Authorization'] = `Bearer ${refreshToken}`
            const newAccessToken = await authRepository.refreshToken()

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return httpClient(originalRequest)
          }
        } catch (e) {
          authRepository.logout()
          return Promise.reject(e)
        }
      }

      const errorMessage = getErrorMessage(error)

      showErrorNotification('Error', errorMessage)

      console.error('AxiosError failed', errorMessage)

      return Promise.reject(error)
    }
  )
}
