<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Forgot password</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
              <v-btn type="submit" color="primary">Request Password Reset</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { defineComponent, ref, inject } from 'vue'

import { useRouter } from 'vue-router'
import { Routes } from '@/app/router'
import { showSuccessNotification } from '@/utils/notificationService'
export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const router = useRouter()
    const email = ref('')

    const onSubmit = async () => {
      try {
        await authRepository.forgotPassword(email.value)
        showSuccessNotification('Success', 'Password reset request sent successfully')
        router.push({ name: Routes.ResetPassword, query: { email: email.value } })
      } catch (error) {
        console.error('Password reset request failed', error)
      }
    }

    return { email, onSubmit }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
