import { User } from '@/domain/user'

export interface IUserRepository {
  fetchUsers(): Promise<User[]>
}
