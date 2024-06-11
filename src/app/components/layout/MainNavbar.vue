<template>
  <v-app-bar app>
    <v-toolbar-title @click="goToHome">Парольный менеджер</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isAuthenticated" to="/register" text>Register</v-btn>
    <v-btn v-if="isAuthenticated" @click="logout" text>Logout</v-btn>
    <v-btn v-if="!isAuthenticated" to="/login" text>Login</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { defineComponent, computed, inject } from 'vue'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }
    const authStore = inject<IAuthStore>('authStore')

    const isAuthenticated = computed(() => !!authStore.token)

    const logout = async () => {
      await authRepository.logout()
    }

    return { isAuthenticated, logout }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
})
</script>

<style scoped>
/* Добавьте стиль по вашему желанию */
</style>
