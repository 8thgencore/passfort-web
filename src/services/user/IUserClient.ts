import { UserInfoResponse } from '../models/userModels'

export interface IUserClient {
  getUserInfo(): Promise<UserInfoResponse>
}
