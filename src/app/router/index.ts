import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/app/pages/home/HomePage.vue'
import LoginPage from '@/app/pages/auth/LoginPage.vue'
import RegisterPage from '@/app/pages/auth/RegisterPage.vue'
import ConfirmRegistration from '@/app/pages/auth/ConfirmRegistration.vue'
import ResendOtp from '@/app/pages/auth/ResendOtp.vue'
import ChangePassword from '@/app/pages/auth/ChangePassword.vue'
import ForgotPassword from '@/app/pages/auth/ForgotPassword.vue'
import ResetPassword from '@/app/pages/auth/ResetPassword.vue'
import ProfilePage from '@/app/pages/profile/ProfilePage.vue'
import CreateMasterPasswordPage from '@/app/pages/master-password/CreateMasterPasswordPage.vue'
import ChangeMasterPasswordPage from '@/app/pages/master-password/ChangeMasterPasswordPage.vue'
import { createAuthGuard } from './middleware'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'

export enum Routes {
  Home = 'home',
  Login = 'login',
  Register = 'register',
  ConfirmRegistration = 'confirm-otp',
  ResendOtp = 'resend-otp',
  ChangePassword = 'change-password',
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',
  //
  Profile = 'profile',
  //
  CreateMasterPassword = 'create-master-password',
  ChangeMasterPassword = 'change-master-password'
}

const routes = [
  { path: '/', name: Routes.Home, component: HomePage },
  { path: '/login', name: Routes.Login, component: LoginPage },
  { path: '/register', name: Routes.Register, component: RegisterPage },
  {
    path: '/confirm-registration',
    name: Routes.ConfirmRegistration,
    component: ConfirmRegistration
  },
  { path: '/resend-otp', name: Routes.ResendOtp, component: ResendOtp },
  { path: '/change-password', name: Routes.ChangePassword, component: ChangePassword },
  { path: '/forgot-password', name: Routes.ForgotPassword, component: ForgotPassword },
  { path: '/reset-password', name: Routes.ResetPassword, component: ResetPassword },
  { path: '/profile', name: Routes.Profile, component: ProfilePage },
  {
    path: '/create-master-password',
    name: Routes.CreateMasterPassword,
    component: CreateMasterPasswordPage
  },
  {
    path: '/change-master-password',
    name: Routes.ChangeMasterPassword,
    component: ChangeMasterPasswordPage
  }
]

export function createAppRouter(authRepository: IAuthRepository) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  // Add the auth guard
  router.beforeEach(createAuthGuard(authRepository))

  return router
}
