export interface IAuthRepository {
  login(email: string, password: string): Promise<string>
  register(email: string, name: string, password: string): Promise<void>
  logout(): Promise<void>
  refreshToken(): Promise<string>
  confirmRegistration(email: string, otp: string): Promise<void>
  resendOtp(email: string): Promise<void>
  changePassword(newPassword: string, oldPassword: string): Promise<void>
  forgotPassword(email: string): Promise<void>
  resetPassword(email: string, newPassword: string, otp: string): Promise<void>
  isAuthenticated(): boolean
  getAccessToken(): string
  getRefreshToken(): string
}
