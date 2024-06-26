import {
  ChangePasswordRequest,
  ConfirmRegistrationRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResendOtpRequest,
  ResetPasswordRequest
} from '@/services/models/authModels'
import { AuthResponse } from '@/services/models/authModels'

export interface IAuthClient {
  login(data: LoginRequest): Promise<AuthResponse>
  register(data: RegisterRequest): Promise<void>
  logout(): Promise<void>
  refreshToken(): Promise<AuthResponse>
  confirmRegistration(data: ConfirmRegistrationRequest): Promise<void>
  resendOtp(data: ResendOtpRequest): Promise<void>
  changePassword(data: ChangePasswordRequest): Promise<void>
  forgotPassword(data: ForgotPasswordRequest): Promise<void>
  resetPassword(data: ResetPasswordRequest): Promise<void>
}
