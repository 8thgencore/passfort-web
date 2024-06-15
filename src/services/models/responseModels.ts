export interface ErrorResponse {
  success: boolean
  messages: string[]
}

export interface Meta {
  limit: number
  skip: number
  total: number
}

export interface Response<T = any> {
  data: T
  message: string
  success: boolean
}
