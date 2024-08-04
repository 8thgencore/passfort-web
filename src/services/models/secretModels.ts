import { SecretType } from '@/domain/secretType'

export interface CreateTextSecretRequest {
  name: string
  description: string
  secret_type: SecretType.TEXT
  text: string
}

export interface CreatePasswordSecretRequest {
  name: string
  description: string
  secret_type: SecretType.PASSWORD
  url: string
  login: string
  password: string
}

export interface UpdateTextSecretRequest {
  name: string
  description: string
  secret_type: SecretType.TEXT
  text: string
}

export interface UpdatePasswordSecretRequest {
  name: string
  description: string
  secret_type: SecretType.PASSWORD
  url: string
  login: string
  password: string
}

export interface SecretResponse {
  id: string
  collection_id: string
  name: string
  description: string
  secret_type: string
  created_by: string
  updated_by: string
  created_at: Date
  updated_at: Date
  text_secret: TextResponse
  password_secret: PasswordResponse
}

export interface SecretsResponse {
  secrets: SecretResponse[]
}

export interface TextResponse {
  text: string
}

export interface PasswordResponse {
  url: string
  login: string
  password: string
}
