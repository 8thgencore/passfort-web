import { IAuthClient } from '@/services/auth/IAuthClient'
import { IHttpClient } from '@/services/http/IHttpClient'
import { LoginRequest, RegisterRequest } from '@/services/models/requestModels'
import { Response, AuthResponse } from '@/services/models/responseModels'

export class AuthClient implements IAuthClient {
  constructor(private httpClient: IHttpClient) {}

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await this.httpClient.post<Response<AuthResponse>>('/auth/login', request)
    return response.data
  }

  async register(request: RegisterRequest): Promise<void> {
    await this.httpClient.post<void>('/auth/register', request)
  }

  async logout(): Promise<void> {
    await this.httpClient.post<void>('/auth/logout', {})
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await this.httpClient.post<Response<AuthResponse>>('/auth/refresh-token', {})
    return response.data
  }
}
