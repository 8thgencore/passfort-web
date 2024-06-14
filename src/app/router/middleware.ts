import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'

export const authGuard = (authRepository: IAuthRepository) => {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const isAuthenticated = authRepository.isAuthenticated()

    const publicPages = ['login', 'register', 'forgot-password', 'reset-password']
    const authRequired = !publicPages.includes(to.name as string)

    if (authRequired && !isAuthenticated) {
      return next({ name: 'login' })
    }

    next()
  }
}
