export interface UserRoleEnum {
  ADMIN: 'admin'
  USER: 'user'
}

export interface UserResponse {
  id: string
  email: string
  name: string
  master_password_set: boolean
  created_at: string
  updated_at: string
}

export interface UpdateUserRequest {
  email: string
  name: string
  role: keyof UserRoleEnum
}
