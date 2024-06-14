import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/app/pages/HomePage.vue'
import LoginPage from '@/app/pages/auth/LoginPage.vue'
import RegisterPage from '@/app/pages/auth/RegisterPage.vue'
import LogoutPage from '@/app/pages/auth/LogoutPage.vue'
import ConfirmRegistration from '@/app/pages/auth/ConfirmRegistration.vue'
import ResendOtp from '@/app/pages/auth/ResendOtp.vue'
import ChangePassword from '@/app/pages/auth/ChangePassword.vue'
import ForgotPassword from '@/app/pages/auth/ForgotPassword.vue'
import ResetPassword from '@/app/pages/auth/ResetPassword.vue'
import ProfilePage from '@/app/pages/user/ProfilePage.vue'
import { authGuard } from './middleware'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { inject } from 'vue'

export enum Routes {
  Home = 'home',
  Login = 'login',
  Register = 'register',
  Logout = 'logout',
  ConfirmRegistration = 'confirm-otp',
  ResendOtp = 'resend-otp',
  ChangePassword = 'change-password',
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',
  //
  Profile = 'profile'
}

const routes = [
  { path: '/', name: Routes.Home, component: HomePage },
  { path: '/login', name: Routes.Login, component: LoginPage },
  { path: '/register', name: Routes.Register, component: RegisterPage },
  { path: '/logout', name: Routes.Logout, component: LogoutPage },
  {
    path: '/confirm-registration',
    name: Routes.ConfirmRegistration,
    component: ConfirmRegistration
  },
  { path: '/resend-otp', name: Routes.ResendOtp, component: ResendOtp },
  { path: '/change-password', name: Routes.ChangePassword, component: ChangePassword },
  { path: '/forgot-password', name: Routes.ForgotPassword, component: ForgotPassword },
  { path: '/reset-password', name: Routes.ResetPassword, component: ResetPassword },
  { path: '/profile', name: Routes.Profile, component: ProfilePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Add the auth guard
// const authRepository = inject<IAuthRepository>('authRepository')
// if (!authRepository) {
//   throw new Error('authRepository is not provided')
// }
// router.beforeEach(authGuard(authRepository as IAuthRepository))

export default router
