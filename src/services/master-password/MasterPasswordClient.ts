import { HttpClient } from '@/services/http/HttpClient'
import {
  CreateMasterPasswordRequest,
  ChangeMasterPasswordRequest,
  ActivateMasterPasswordRequest
} from '@/services/models/masterPasswordModels'

export class MasterPasswordClient implements MasterPasswordClient {
  constructor(private httpClient: HttpClient) {}

  async createMasterPassword(data: CreateMasterPasswordRequest): Promise<void> {
    await this.httpClient.post('/master-password', data)
  }

  async changeMasterPassword(data: ChangeMasterPasswordRequest): Promise<void> {
    await this.httpClient.put('/master-password', data)
  }

  async activateMasterPassword(data: ActivateMasterPasswordRequest): Promise<void> {
    await this.httpClient.post('/master-password/activate', data)
  }
}
