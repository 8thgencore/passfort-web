export interface IAuthStore {
  setTokens(accessToken: string, refreshToken: string): void
  clearTokens(): void
  isAuthenticated(): boolean
  getAccessToken(): string | null
  getRefreshToken(): string | null
}
