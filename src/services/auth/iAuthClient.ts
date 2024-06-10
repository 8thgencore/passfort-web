import { LoginRequest, RegisterRequest } from '../models/requestModels'
import { AuthResponse } from '../models/responseModels'

export interface IAuthClient {
  login(request: LoginRequest): Promise<AuthResponse>
  register(request: RegisterRequest): Promise<void>
  logout(): Promise<void>
  refreshToken(): Promise<AuthResponse>
}
