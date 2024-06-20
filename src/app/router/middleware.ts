import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { Routes } from '.'

export const createAuthGuard = (authRepository: IAuthRepository) => {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const isAuthenticated = authRepository.isAuthenticated()

    const publicPages: string[] = [
      Routes.Home,
      Routes.Login,
      Routes.Register,
      Routes.ForgotPassword,
      Routes.ResetPassword,
      Routes.ResendOtp,
      Routes.ConfirmRegistration
    ]
    const authRequired = !publicPages.includes(to.name as string)

    if (authRequired && !isAuthenticated) {
      return next({ name: 'login' })
    }

    next()
  }
}
