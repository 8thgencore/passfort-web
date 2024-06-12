export interface IAuthRepository {
  login(email: string, password: string): Promise<string>
  register(email: string, name: string, password: string): Promise<void>
  logout(): Promise<void>
  refreshToken(): Promise<string>
  isAuthenticated(): boolean
  getAccessToken(): string
  getRefreshToken(): string
}
