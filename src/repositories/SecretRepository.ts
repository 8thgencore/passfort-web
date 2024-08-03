import { Secret, SecretFactory } from '@/domain/secret'
import { ISecretRepository } from './interfaces/ISecretRepository'
import {
  CreateTextSecretRequest,
  CreatePasswordSecretRequest,
  UpdateTextSecretRequest,
  UpdatePasswordSecretRequest,
  SecretResponse
} from '@/services/models/secretModels'
import { ISecretClient } from '@/services/secret/ISecretClient'

export class SecretRepository implements ISecretRepository {
  private readonly secretClient: ISecretClient

  constructor(secretClient: ISecretClient) {
    this.secretClient = secretClient
  }

  async listSecrets(collectionId: string, skip?: number, limit?: number): Promise<Secret[]> {
    const response: SecretResponse[] = await this.secretClient.listSecrets(
      collectionId,
      skip,
      limit
    )
    if (response != null) {
      return response.map(SecretFactory.createFromDto)
    } else {
      return []
    }
  }

  async createTextSecret(collectionId: string, secret: CreateTextSecretRequest): Promise<Secret> {
    const response: SecretResponse = await this.secretClient.createTextSecret(collectionId, secret)
    return SecretFactory.createFromDto(response)
  }

  async createPasswordSecret(
    collectionId: string,
    secret: CreatePasswordSecretRequest
  ): Promise<Secret> {
    const response: SecretResponse = await this.secretClient.createPasswordSecret(
      collectionId,
      secret
    )
    return SecretFactory.createFromDto(response)
  }

  async getSecret(collectionId: string, secretId: string): Promise<Secret> {
    const response: SecretResponse = await this.secretClient.getSecret(collectionId, secretId)
    return SecretFactory.createFromDto(response)
  }

  async updateTextSecret(
    collectionId: string,
    secretId: string,
    secret: UpdateTextSecretRequest
  ): Promise<Secret> {
    const response: SecretResponse = await this.secretClient.updateTextSecret(
      collectionId,
      secretId,
      secret
    )
    return SecretFactory.createFromDto(response)
  }

  async updatePasswordSecret(
    collectionId: string,
    secretId: string,
    secret: UpdatePasswordSecretRequest
  ): Promise<Secret> {
    const response: SecretResponse = await this.secretClient.updatePasswordSecret(
      collectionId,
      secretId,
      secret
    )
    return SecretFactory.createFromDto(response)
  }

  async deleteSecret(collectionId: string, secretId: string): Promise<void> {
    return this.secretClient.deleteSecret(collectionId, secretId)
  }
}
