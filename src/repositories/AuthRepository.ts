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
    try {
      await this.authClient.logout()
    } catch (e) {
      console.log('failed to logout on the server')
    }
    this.authStore.clearTokens()
  }

  async refreshToken(): Promise<string> {
    const response = await this.authClient.refreshToken()

    const newAccessToken = response.access_token
    const newRefreshToken = response.refresh_token
    this.authStore.setTokens(newAccessToken, newRefreshToken)

    return newAccessToken
  }

  async confirmRegistration(email: string, otp: string): Promise<void> {
    await this.authClient.confirmRegistration({ email, otp })
  }

  async resendOtp(email: string): Promise<void> {
    await this.authClient.resendOtp({ email })
  }

  async changePassword(newPassword: string, oldPassword: string): Promise<void> {
    await this.authClient.changePassword({ new_password: newPassword, old_password: oldPassword })
  }

  async forgotPassword(email: string): Promise<void> {
    await this.authClient.forgotPassword({ email })
  }

  async resetPassword(email: string, newPassword: string, otp: string): Promise<void> {
    await this.authClient.resetPassword({ email, new_password: newPassword, otp })
  }

  isAuthenticated(): boolean {
    return this.authStore.isAuthenticated()
  }

  getAccessToken(): string | null {
    return this.authStore.getAccessToken()
  }

  getRefreshToken(): string | null {
    return this.authStore.getRefreshToken()
  }
}
