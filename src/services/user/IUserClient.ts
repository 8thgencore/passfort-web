import { UserResponse } from '../models/userModels'

export interface IUserClient {
  getUserInfo(): Promise<UserResponse>
}
