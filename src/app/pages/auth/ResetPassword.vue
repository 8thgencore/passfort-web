<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Reset password</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
              <v-text-field v-model="otp" label="OTP" required></v-text-field>
              <v-text-field
                v-model="newPassword"
                label="New Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Reset Password</v-btn>
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
import { Routes } from '@/app/router'
import { useRouter, useRoute } from 'vue-router'
import { showSuccessNotification } from '@/utils/notificationService'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const route = useRoute()
    const router = useRouter()

    const otp = ref('')
    const newPassword = ref('')
    const email = route.query.email?.toString() ?? ''

    const onSubmit = async () => {
      try {
        await authRepository.resetPassword(email, newPassword.value, otp.value)
        showSuccessNotification('Success', 'Password reset successfully')
        router.push(Routes.Login)
      } catch (error) {
        console.error('Password reset failed', error)
      }
    }

    return { email, otp, newPassword, onSubmit }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
