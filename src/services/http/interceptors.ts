import { AxiosInstance, AxiosError } from 'axios'
import { useNotification } from '@kyvg/vue3-notification'

export function setupInterceptors(httpClient: AxiosInstance): void {
  const { notify } = useNotification()

  // Перехватчик для добавления токена авторизации к каждому запросу
  httpClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token')
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
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        // Логика обработки ошибки 401 (Unauthorized), например, перенаправление на страницу входа
        console.log('Unauthorized, redirecting to login...')
      }
      return Promise.reject(error)
    }
  )

  httpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Обработка ошибок
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
