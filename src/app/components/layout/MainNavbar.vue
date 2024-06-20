<template>
  <v-app-bar app>
    <v-toolbar-title @click="goToHome">
      <span class="logo-container">
        <img src="@/app/assets/logo.svg" alt="PassFort Logo" class="logo" />
        PassFort
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isAuthenticated" to="/register" boolean>Register</v-btn>
    <v-btn v-if="!isAuthenticated" to="/login" boolean>Login</v-btn>
    <v-btn v-if="isAuthenticated" @click="goToProfile" boolean>
      <v-icon>mdi-account</v-icon>
      {{ username }}
    </v-btn>
    <v-btn v-if="isAuthenticated" icon @click="openConfirmationDialog" boolean>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
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
import { IUserRepository } from '@/repositories/interfaces/IUserRepository'
import { defineComponent, computed, inject, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useThemeSwitcher from '@/composables/useThemeSwitcher'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }
    const userRepository = inject<IUserRepository>('userRepository')
    if (!userRepository) {
      throw new Error('userRepository is not provided')
    }

    const router = useRouter()

    const dialog = ref(false)

    const isAuthenticated = computed(() => authRepository.isAuthenticated())
    const username = ref('')

    const loadUserData = async () => {
      try {
        const userData = await userRepository.getUserInfo()
        username.value = userData.name
      } catch (error) {
        console.error('Failed to load user data', error)
      }
    }

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
    const { isDarkTheme, toggleTheme } = useThemeSwitcher()

    onMounted(() => {
      if (isAuthenticated.value) {
        loadUserData()
      }
    })

    return {
      isAuthenticated,
      logout,
      dialog,
      openConfirmationDialog,
      goToHome,
      goToProfile,
      isDarkTheme,
      toggleTheme,
      username
    }
  }
})
</script>

<style scoped>
.logo {
  height: 40px; /* Adjust as needed */
  margin-right: 10px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.username {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 5px;
}
</style>
