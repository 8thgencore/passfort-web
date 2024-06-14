<template>
  <v-container>
    <v-form @submit.prevent="onSubmit">
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
    <v-btn @click="goToForgotPassword" color="secondary" class="mt-2" outlined
      >Forgot Password</v-btn
    >
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { Routes } from '@/app/router'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const onSubmit = async () => {
      try {
        await authRepository.login(email.value, password.value)
        router.push(Routes.Home)
      } catch (error) {
        console.error('Login failed', error)
      }
    }

    const goToForgotPassword = () => {
      router.push(Routes.ForgotPassword)
    }

    return { email, password, onSubmit, goToForgotPassword }
  }
})
</script>

<style scoped>
/* Добавьте стиль по вашему желанию */
</style>
