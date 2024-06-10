import { IAuthRepository } from './interfaces/IAuthRepository'
import { IAuthClient } from '@/services/auth/IAuthClient'
import { IAuthStore } from '@/store/modules/auth/interfaces/iAuthStore'

export class AuthRepository implements IAuthRepository {
  constructor(
    private authClient: IAuthClient,
    private authStore: IAuthStore
  ) {}

  async login(email: string, password: string): Promise<string> {
    const response = await this.authClient.login({ email, password })
    const token = response.access_token
    this.authStore.setToken(token)
    return token
  }

  async register(email: string, name: string, password: string): Promise<void> {
    await this.authClient.register({ email, name, password })
  }

  async logout(): Promise<void> {
    await this.authClient.logout()
    this.authStore.clearToken()
  }
}
