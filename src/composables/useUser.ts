import { ref, computed, inject } from 'vue'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { IUserRepository } from '@/repositories/interfaces/IUserRepository'

export default function useUser() {
  const authRepository = inject<IAuthRepository>('authRepository')
  if (!authRepository) {
    throw new Error('authRepository is not provided')
  }
  const userRepository = inject<IUserRepository>('userRepository')
  if (!userRepository) {
    throw new Error('userRepository is not provided')
  }

  const user = ref({
    email: '',
    name: '',
    role: '',
    master_password_set: false,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  const username = ref('')

  const isAuthenticated = computed(() => authRepository.isAuthenticated())
  const isSetMasterPassword = computed(() => user.value.master_password_set)

  const loadUserData = async () => {
    try {
      const userData = await userRepository.getUserInfo()
      user.value = userData
      username.value = userData.name
    } catch (error) {
      console.error('Failed to load user data', error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await authRepository.login(email, password)
      await loadUserData()
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  const logout = async () => {
    try {
      await authRepository.logout()
      username.value = ''
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return { user, username, isAuthenticated, isSetMasterPassword, loadUserData, login, logout }
}
