export interface AuthResponse {
  access_token: string
  refresh_token: string
}

export interface ErrorResponse {
  success: boolean
  messages: string[]
}

export interface Meta {
  limit: number
  skip: number
  total: number
}

export interface PasswordSecretResponse {
  login: string
  password: string
  url: string
}

export interface Response<T = any> {
  data: T
  message: string
  success: boolean
}

export interface UserResponse {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}
