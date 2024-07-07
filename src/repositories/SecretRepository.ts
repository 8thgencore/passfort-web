import { Secret } from "@/domain/secret";
import { ISecretRepository } from "./interfaces/ISecretRepository";
import { CreateTextSecretRequest, CreatePasswordSecretRequest, UpdateTextSecretRequest, UpdatePasswordSecretRequest } from "@/services/models/secretModels";
import { ISecretClient } from "@/services/secret/ISecretClient";

export class SecretRepository implements ISecretRepository {
    private readonly secretClient: ISecretClient;
  
    constructor(secretClient: ISecretClient) {
      this.secretClient = secretClient;
    }
  
    async listSecrets(collectionId: string, skip?: number, limit?: number): Promise<Secret[]> {
      return this.secretClient.listSecrets(collectionId, skip, limit);
    }
  
    async createTextSecret(collectionId: string, secret: CreateTextSecretRequest): Promise<Secret> {
      return this.secretClient.createTextSecret(collectionId, secret);
    }
  
    async createPasswordSecret(collectionId: string, secret: CreatePasswordSecretRequest): Promise<Secret> {
      return this.secretClient.createPasswordSecret(collectionId, secret);
    }
  
    async getSecret(collectionId: string, secretId: string): Promise<Secret> {
      return this.secretClient.getSecret(collectionId, secretId);
    }
  
    async updateTextSecret(collectionId: string, secretId: string, secret: UpdateTextSecretRequest): Promise<Secret> {
      return this.secretClient.updateTextSecret(collectionId, secretId, secret);
    }
  
    async updatePasswordSecret(collectionId: string, secretId: string, secret: UpdatePasswordSecretRequest): Promise<Secret> {
      return this.secretClient.updatePasswordSecret(collectionId, secretId, secret);
    }
  
    async deleteSecret(collectionId: string, secretId: string): Promise<void> {
      return this.secretClient.deleteSecret(collectionId, secretId);
    }
  }
  