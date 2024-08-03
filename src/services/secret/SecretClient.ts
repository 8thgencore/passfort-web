import { Secret } from '@/domain/secret'
import {
  CreateTextSecretRequest,
  CreatePasswordSecretRequest,
  UpdateTextSecretRequest,
  UpdatePasswordSecretRequest,
  SecretsResponse,
  SecretResponse
} from '../models/secretModels'
import { ISecretClient } from './ISecretClient'
import { HttpClient } from '../http/HttpClient'
import { Response } from '@/services/models/baseModels'

export class SecretClient implements ISecretClient {
  constructor(private httpClient: HttpClient) {}

  async listSecrets(
    collectionId: string,
    skip?: number,
    limit?: number
  ): Promise<SecretResponse[]> {
    const params = new URLSearchParams()
    if (skip) params.append('skip', skip.toString())
    if (limit) params.append('limit', limit.toString())

    const response = await this.httpClient.get<Response<SecretsResponse>>(
      `/collections/${collectionId}/secrets?${params.toString()}`
    )
    return response.data.secrets
  }

  async createTextSecret(
    collectionId: string,
    secret: CreateTextSecretRequest
  ): Promise<SecretResponse> {
    const response = await this.httpClient.post<Response<SecretResponse>>(
      `/collections/${collectionId}/secrets`,
      secret
    )
    return response.data
  }

  async createPasswordSecret(
    collectionId: string,
    secret: CreatePasswordSecretRequest
  ): Promise<SecretResponse> {
    const response = await this.httpClient.post<Response<SecretResponse>>(
      `/collections/${collectionId}/secrets`,
      secret
    )
    return response.data
  }

  async getSecret(collectionId: string, secretId: string): Promise<SecretResponse> {
    const response = await this.httpClient.get<Response<SecretResponse>>(
      `/collections/${collectionId}/secrets/${secretId}`
    )
    return response.data
  }

  async updateTextSecret(
    collectionId: string,
    secretId: string,
    secret: UpdateTextSecretRequest
  ): Promise<SecretResponse> {
    const response = await this.httpClient.put<Response<SecretResponse>>(
      `/collections/${collectionId}/secrets/${secretId}`,
      secret
    )
    return response.data
  }

  async updatePasswordSecret(
    collectionId: string,
    secretId: string,
    secret: UpdatePasswordSecretRequest
  ): Promise<SecretResponse> {
    const response = await this.httpClient.put<Response<SecretResponse>>(
      `/collections/${collectionId}/secrets/${secretId}`,
      secret
    )
    return response.data
  }

  async deleteSecret(collectionId: string, secretId: string): Promise<void> {
    await this.httpClient.delete(`/collections/${collectionId}/secrets/${secretId}`)
  }
}
