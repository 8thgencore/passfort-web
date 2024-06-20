export interface CreateMasterPasswordRequest {
  password: string
}

export interface ChangeMasterPasswordRequest {
  current_password: string
  new_password: string
}

export interface ActivateMasterPasswordRequest {
  password: string
}
