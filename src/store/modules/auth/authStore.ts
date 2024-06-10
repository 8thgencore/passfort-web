import { defineStore } from 'pinia'
import { IAuthStore } from './interfaces/iAuthStore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    clearToken() {
      this.token = ''
      localStorage.removeItem('token')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})

export class AuthStore implements IAuthStore {
  private store = useAuthStore()

  setToken(token: string): void {
    this.store.setToken(token)
  }

  clearToken(): void {
    this.store.clearToken()
  }

  isAuthenticated(): boolean {
    return this.store.isAuthenticated
  }
}
