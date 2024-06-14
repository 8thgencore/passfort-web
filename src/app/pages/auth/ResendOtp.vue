<template>
  <v-container>
    <v-form @submit.prevent="resendOtp">
      <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
      <v-btn type="submit" color="primary">Resend OTP</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { useRouter } from 'vue-router'
import { Routes } from '@/app/router'
import { showSuccessNotification } from '@/utils/notificationService'

export default defineComponent({
  name: 'ResendOtp',
  setup() {
    const email = ref('')
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }
    const router = useRouter()

    const resendOtp = async () => {
      try {
        await authRepository.resendOtp(email.value)
        showSuccessNotification('Success', 'OTP code sent successfully')
        router.push({ name: Routes.ConfirmRegistration, query: { email: email.value } })
      } catch (error) {
        //
      }
    }

    return { email, resendOtp }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
