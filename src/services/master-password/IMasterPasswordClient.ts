import {
  CreateMasterPasswordRequest,
  ChangeMasterPasswordRequest,
  ActivateMasterPasswordRequest
} from '@/services/models/masterPasswordModels'

export interface IMasterPasswordClient {
  createMasterPassword(data: CreateMasterPasswordRequest): Promise<void>
  changeMasterPassword(data: ChangeMasterPasswordRequest): Promise<void>
  activateMasterPassword(data: ActivateMasterPasswordRequest): Promise<void>
}
