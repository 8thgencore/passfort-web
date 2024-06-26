import { UserResponse } from '@/services/models/userModels'
import { BaseEntity } from './common/baseEntity'
import { EntityId } from './common/entityId'

export enum UserRoleEnum {
  AdminRole = 'admin',
  UserRole = 'user'
}

export class User extends BaseEntity {
  constructor(
    id: EntityId,
    public readonly email: string,
    public readonly name: string,
    public readonly role: UserRoleEnum,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    super(id)

    if (!email || !name || !role) {
      throw new Error('Email, name, and role must not be empty')
    }
  }
}

export class UserFactory {
  static createFromDto(dto: UserResponse): User {
    return new User(
      new EntityId(dto.id),
      dto.email,
      dto.name,
      UserRoleEnum.UserRole,
      new Date(dto.created_at),
      new Date(dto.updated_at)
    )
  }
}
