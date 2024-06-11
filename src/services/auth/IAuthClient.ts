import { LoginRequest, RegisterRequest } from '@/services/models/requestModels'
import { AuthResponse } from '@/services/models/responseModels'

export interface IAuthClient {
  login(request: LoginRequest): Promise<AuthResponse>
  register(request: RegisterRequest): Promise<void>
  logout(): Promise<void>
  refreshToken(): Promise<AuthResponse>
}
