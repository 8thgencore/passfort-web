export interface UserRoleEnum {
  ADMIN: 'admin'
  USER: 'user'
}

export interface UpdateUserRequest {
  email: string
  name: string
  role: keyof UserRoleEnum
}

export interface UserInfoResponse {
  id: string
  name: string
  email: string
  updated_at: string
  created_at: string
}
