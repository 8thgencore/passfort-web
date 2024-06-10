export interface UserRoleEnum {
  ADMIN: 'admin'
  USER: 'user'
}

export interface UpdateUserRequest {
  email: string
  name: string
  role: keyof UserRoleEnum
}
