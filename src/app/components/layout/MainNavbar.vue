<template>
  <v-app-bar app>
    <v-toolbar-title @click="goToHome">Парольный менеджер</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isAuthenticated" to="/register" boolean>Register</v-btn>
    <v-btn v-if="!isAuthenticated" to="/login" boolean>Login</v-btn>
    <v-btn v-if="isAuthenticated" @click="logout" boolean>Logout</v-btn>
    <v-btn v-if="isAuthenticated" @click="goToProfile" boolean>Profile</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Routes } from '@/app/router'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { defineComponent, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const router = useRouter()

    const isAuthenticated = computed(() => authRepository.isAuthenticated())

    const logout = async () => {
      await authRepository.logout()
      window.location.reload()
    }

    const goToHome = () => {
      router.push({ name: Routes.Home })
    }

    const goToProfile = () => {
      router.push({ name: Routes.Profile })
    }

    return { isAuthenticated, logout, goToHome, goToProfile }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
