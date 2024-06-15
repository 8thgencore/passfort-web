import { defineStore } from 'pinia'
import { IAuthStore } from '@/store/modules/auth/interfaces/IAuthStore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token') 
  }),
  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
    },
    clearTokens() {
      this.accessToken = ''
      this.refreshToken = ''
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken
  }
})

export class AuthStore implements IAuthStore {
  private store = useAuthStore()

  setTokens(accessToken: string, refreshToken: string): void {
    this.store.setTokens(accessToken, refreshToken)
  }

  clearTokens(): void {
    this.store.clearTokens()
  }

  isAuthenticated(): boolean {
    return this.store.isAuthenticated
  }

  getAccessToken(): string | null {
    return this.store.accessToken
  }

  getRefreshToken(): string | null {
    return this.store.refreshToken
  }
}
