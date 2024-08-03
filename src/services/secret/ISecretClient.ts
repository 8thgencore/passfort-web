import { Secret } from '@/domain/secret'
import {
  CreatePasswordSecretRequest,
  CreateTextSecretRequest,
  SecretResponse,
  UpdatePasswordSecretRequest,
  UpdateTextSecretRequest
} from '../models/secretModels'

export interface ISecretClient {
  listSecrets(collectionId: string, skip?: number, limit?: number): Promise<SecretResponse[]>
  createTextSecret(collectionId: string, secret: CreateTextSecretRequest): Promise<SecretResponse>
  createPasswordSecret(collectionId: string, secret: CreatePasswordSecretRequest): Promise<SecretResponse>
  getSecret(collectionId: string, secretId: string): Promise<SecretResponse>
  updateTextSecret(
    collectionId: string,
    secretId: string,
    secret: UpdateTextSecretRequest
  ): Promise<SecretResponse>
  updatePasswordSecret(
    collectionId: string,
    secretId: string,
    secret: UpdatePasswordSecretRequest
  ): Promise<SecretResponse>
  deleteSecret(collectionId: string, secretId: string): Promise<void>
}
