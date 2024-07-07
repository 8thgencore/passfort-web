import { Secret } from '@/domain/secret'
import {
  CreatePasswordSecretRequest,
  CreateTextSecretRequest,
  UpdatePasswordSecretRequest,
  UpdateTextSecretRequest
} from '@/services/models/secretModels'

export interface ISecretRepository {
  listSecrets(collectionId: string, skip?: number, limit?: number): Promise<Secret[]>
  createTextSecret(collectionId: string, secret: CreateTextSecretRequest): Promise<Secret>
  createPasswordSecret(collectionId: string, secret: CreatePasswordSecretRequest): Promise<Secret>
  getSecret(collectionId: string, secretId: string): Promise<Secret>
  updateTextSecret(
    collectionId: string,
    secretId: string,
    secret: UpdateTextSecretRequest
  ): Promise<Secret>
  updatePasswordSecret(
    collectionId: string,
    secretId: string,
    secret: UpdatePasswordSecretRequest
  ): Promise<Secret>
  deleteSecret(collectionId: string, secretId: string): Promise<void>
}
