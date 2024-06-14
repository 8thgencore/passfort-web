import { UserInfoResponse } from '@/services/models/userModels'
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
  }

  // Static method to convert from DTO
  static convertFromDto(dto: UserInfoResponse): User {
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
