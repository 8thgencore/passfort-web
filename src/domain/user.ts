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

  changeRole(newRole: UserRoleEnum): void {
    // Example of business logic
    if (newRole === UserRoleEnum.AdminRole && this.role !== UserRoleEnum.AdminRole) {
      // Perform some additional checks or actions
    }
    // this.role = newRole;
  }

  updateName(newName: string): void {
    if (!newName || newName.length < 3) {
      throw new Error('Name must be at least 3 characters long')
    }
    // this.name = newName;
  }

  // Add other methods as needed
}
