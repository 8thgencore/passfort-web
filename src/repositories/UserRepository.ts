import { IUserClient } from '@/services/user/IUserClient'
import { IUserRepository } from './interfaces/IUserRepository'
import { User, UserFactory } from '@/domain/user'

export class UserRepository implements IUserRepository {
  private userClient: IUserClient

  constructor(userClient: IUserClient) {
    this.userClient = userClient
  }

  async fetchUsers(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async getUserInfo(): Promise<User> {
    const userResponse = await this.userClient.getUserInfo()
    return UserFactory.createFromDto(userResponse)
  }
}
