<template>
  <v-app-bar app>
    <v-toolbar-title @click="goToHome">Парольный менеджер</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isAuthenticated" to="/register" boolean>Register</v-btn>
    <v-btn v-if="!isAuthenticated" to="/login" boolean>Login</v-btn>
    <v-btn v-if="isAuthenticated" @click="openConfirmationDialog" boolean>Logout</v-btn>
    <v-btn v-if="isAuthenticated" @click="goToProfile" boolean>Profile</v-btn>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ isDarkTheme ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm Logout</v-card-title>
        <v-card-text> Are you sure you want to logout? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" string @click="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" string @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import { Routes } from '@/app/router'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { defineComponent, computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const router = useRouter()

    const dialog = ref(false)

    const isAuthenticated = computed(() => authRepository.isAuthenticated())

    const openConfirmationDialog = () => {
      dialog.value = true
    }

    const logout = async () => {
      try {
        await authRepository.logout()
        router.push({ name: Routes.Home })
      } catch (error) {
        console.error('Logout failed', error)
      } finally {
        dialog.value = false
      }
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

    return {
      isAuthenticated,
      logout,
      dialog,
      openConfirmationDialog,
      goToHome,
      goToProfile,
      isDarkTheme,
      toggleTheme
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
