export interface IAuthStore {
  setTokens(accessToken: string, refreshToken: string): void
  clearTokens(): void
  isAuthenticated(): boolean
  getAccessToken(): string
  getRefreshToken(): string
}
