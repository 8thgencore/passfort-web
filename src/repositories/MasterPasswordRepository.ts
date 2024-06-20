import { IMasterPasswordClient } from '@/services/master-password/IMasterPasswordClient'
import { IMasterPasswordRepository } from './interfaces/IMasterPasswordRepository'

export class MasterPasswordRepository implements IMasterPasswordRepository {
  constructor(private masterPasswordClient: IMasterPasswordClient) {}

  async createMasterPassword(password: string): Promise<void> {
    await this.masterPasswordClient.createMasterPassword({ password })
  }

  async changeMasterPassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.masterPasswordClient.changeMasterPassword({
      current_password: currentPassword,
      new_password: newPassword
    })
  }

  async activateMasterPassword(password: string): Promise<void> {
    await this.masterPasswordClient.activateMasterPassword({ password })
  }
}
