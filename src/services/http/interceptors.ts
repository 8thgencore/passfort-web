import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useNotification } from '@kyvg/vue3-notification'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export function setupInterceptors(
  httpClient: AxiosInstance,
  authRepository: IAuthRepository
): void {
  const { notify } = useNotification()

  // Перехватчик для добавления токена авторизации к каждому запросу
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

  // Перехватчик для обработки ошибок в ответах
  httpClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as ExtendedAxiosRequestConfig

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          const refreshToken = authRepository.getRefreshToken()
          httpClient.defaults.headers['Authorization'] = `Bearer ${refreshToken}`
          const newAccessToken = await authRepository.refreshToken()

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return httpClient(originalRequest)
        } catch (e) {
          authRepository.logout()
          window.location.href = '/login'
        }
      }

      let errorMessage = 'An unknown error occurred'

      if (error.response) {
        const errorData = error.response.data as { message?: string }
        errorMessage = errorData.message || error.response.statusText || errorMessage
      } else if (error.message) {
        errorMessage = error.message
      }

      notify({
        type: 'error',
        title: 'Error',
        text: errorMessage
      })

      console.error('AxiosError failed', error.response?.data)

      return Promise.reject(error)
    }
  )
}
