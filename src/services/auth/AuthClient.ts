import { IAuthClient } from '@/services/auth/IAuthClient'
import { IHttpClient } from '@/services/http/IHttpClient'
import { LoginRequest, RegisterRequest } from '@/services/models/requestModels'
import { AuthResponse } from '@/services/models/responseModels'

export class AuthClient implements IAuthClient {
  constructor(private httpClient: IHttpClient) {}

  async login(request: LoginRequest): Promise<AuthResponse> {
    return this.httpClient.post<AuthResponse>('/auth/login', request)
  }

  async register(request: RegisterRequest): Promise<void> {
    await this.httpClient.post<void>('/auth/register', request)
  }

  async logout(): Promise<void> {
    await this.httpClient.post<void>('/auth/logout', {})
  }

  async refreshToken(): Promise<AuthResponse> {
    return this.httpClient.post<AuthResponse>('/auth/refresh-token', {})
  }
}
