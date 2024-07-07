export interface CreateTextSecretRequest {
  name: string
  description: string
  secret_type: 'text'
  text: string
}

export interface CreatePasswordSecretRequest {
  name: string
  description: string
  secret_type: 'password'
  url: string
  login: string
  password: string
}

export interface UpdateTextSecretRequest {
  name: string
  description: string
  secret_type: 'text'
  text: string
}

export interface UpdatePasswordSecretRequest {
  name: string
  description: string
  secret_type: 'password'
  url: string
  login: string
  password: string
}
