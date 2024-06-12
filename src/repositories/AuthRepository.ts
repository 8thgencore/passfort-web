import { IAuthClient } from '@/services/auth/IAuthClient'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { IAuthStore } from '@/store/modules/auth/interfaces/IAuthStore'

export class AuthRepository implements IAuthRepository {
  constructor(
    private authClient: IAuthClient,
    private authStore: IAuthStore
  ) {}

  async login(email: string, password: string): Promise<string> {
    const response = await this.authClient.login({ email, password })
    const accessToken = response.access_token
    const refreshToken = response.refresh_token
    this.authStore.setTokens(accessToken, refreshToken)

    return accessToken
  }

  async register(email: string, name: string, password: string): Promise<void> {
    await this.authClient.register({ email, name, password })
  }

  async logout(): Promise<void> {
    await this.authClient.logout()
    this.authStore.clearTokens()
  }

  async refreshToken(): Promise<string> {
    const response = await this.authClient.refreshToken()

    const newAccessToken = response.access_token
    const newRefreshToken = response.refresh_token
    this.authStore.setTokens(newAccessToken, newRefreshToken)

    return newAccessToken
  }

  isAuthenticated(): boolean {
    return this.authStore.isAuthenticated()
  }

  getAccessToken(): string {
    return this.authStore.getAccessToken()
  }

  getRefreshToken(): string {
    return this.authStore.getRefreshToken()
  }
}
