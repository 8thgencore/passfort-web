<template>
  <v-app-bar app>
    <v-toolbar-title @click="goToHome">Парольный менеджер</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isAuthenticated" to="/register" boolean>Register</v-btn>
    <v-btn v-if="!isAuthenticated" to="/login" boolean>Login</v-btn>
    <v-btn v-if="isAuthenticated" @click="logout" boolean>Logout</v-btn>
    <v-btn v-if="isAuthenticated" @click="goToProfile" boolean>Profile</v-btn>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ isDarkTheme ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Routes } from '@/app/router'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { defineComponent, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

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

    // Toggle theme
    const vuetify = useTheme()

    const isDarkTheme = computed(() => vuetify.global.current.value.dark)

    const toggleTheme = () => {
      vuetify.global.name.value = isDarkTheme.value ? 'light' : 'dark'
    }

    return { isAuthenticated, logout, goToHome, goToProfile, isDarkTheme, toggleTheme }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
