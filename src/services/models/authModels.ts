export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  name: string
  password: string
}

export interface ConfirmRegistrationRequest {
  email: string
  otp: string
}

export interface ResendOTPCodeRequest {
  email: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  new_password: string
  otp: string
}

export interface ChangePasswordRequest {
  old_password: string
  new_password: string
}

export interface ConfirmRegistrationRequest {
  email: string
  otp: string
}

export interface ResendOtpRequest {
  email: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  new_password: string
  otp: string
}

export interface ChangePasswordRequest {
  old_password: string
  new_password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
}

export interface PasswordSecretResponse {
  login: string
  password: string
  url: string
}
