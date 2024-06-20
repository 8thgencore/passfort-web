export interface IMasterPasswordRepository {
  createMasterPassword(password: string): Promise<void>
  changeMasterPassword(currentPassword: string, newPassword: string): Promise<void>
  activateMasterPassword(password: string): Promise<void>
}
