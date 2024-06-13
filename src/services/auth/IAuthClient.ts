import {
  ConfirmRegistrationRequest,
  LoginRequest,
  RegisterRequest,
  ResendOtpRequest
} from '@/services/models/requestModels'
import { AuthResponse } from '@/services/models/responseModels'

export interface IAuthClient {
  login(data: LoginRequest): Promise<AuthResponse>
  register(data: RegisterRequest): Promise<void>
  logout(): Promise<void>
  refreshToken(): Promise<AuthResponse>
  confirmRegistration(data: ConfirmRegistrationRequest): Promise<void>
  resendOtp(data: ResendOtpRequest): Promise<void>
}
