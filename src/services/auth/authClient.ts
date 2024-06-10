import { IAuthClient } from './iAuthClient'
import { IHttpClient } from '../http/iHttpClient'
import { LoginRequest, RegisterRequest } from '../models/requestModels'
import { AuthResponse } from '../models/responseModels'

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
