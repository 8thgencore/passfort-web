import { AxiosInstance } from 'axios'

export function setupInterceptors(httpClient: AxiosInstance): void {
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
}
