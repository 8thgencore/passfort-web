import { IAuthClient } from '@/services/auth/IAuthClient'
import { IHttpClient } from '@/services/http/IHttpClient'
import {
  ConfirmRegistrationRequest,
  LoginRequest,
  RegisterRequest,
  ResendOtpRequest
} from '@/services/models/requestModels'
import { Response, AuthResponse } from '@/services/models/responseModels'

export class AuthClient implements IAuthClient {
  constructor(private httpClient: IHttpClient) {}

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.httpClient.post<Response<AuthResponse>>('/auth/login', data)
    return response.data
  }

  async register(data: RegisterRequest): Promise<void> {
    await this.httpClient.post<void>('/auth/register', data)
  }

  async logout(): Promise<void> {
    await this.httpClient.post<void>('/auth/logout', {})
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await this.httpClient.post<Response<AuthResponse>>('/auth/refresh-token', {})
    return response.data
  }

  async confirmRegistration(data: ConfirmRegistrationRequest): Promise<void> {
    await this.httpClient.post('/auth/register/confirm', data)
  }

  async resendOtp(data: ResendOtpRequest): Promise<void> {
    await this.httpClient.post('/auth/register/resend-otp', data)
  }
}
