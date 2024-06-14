import { UserInfoResponse } from '../models/userModels'
import { IUserClient } from './IUserClient'
import { IHttpClient } from '../http/IHttpClient'

export class UserClient implements IUserClient {
  constructor(private httpClient: IHttpClient) {}

  async getUserInfo(): Promise<UserInfoResponse> {
    const response = await this.httpClient.get<UserInfoResponse>('/users/me')
    return response
  }
}
