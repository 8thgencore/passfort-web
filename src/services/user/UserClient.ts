import { UserResponse } from '../models/userModels'
import { IUserClient } from './IUserClient'
import { IHttpClient } from '../http/IHttpClient'
import { Response } from '@/services/models/baseModels'

export class UserClient implements IUserClient {
  constructor(private httpClient: IHttpClient) {}

  async getUserInfo(): Promise<UserResponse> {
    const response = await this.httpClient.get<Response<UserResponse>>('/users/me')
    return response.data
  }
}
