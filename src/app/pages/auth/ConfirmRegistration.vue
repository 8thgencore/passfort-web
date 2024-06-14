<template>
  <v-container>
    <v-card-title class="headline">Confirm Registration</v-card-title>
    <v-form @submit.prevent="confirmRegistration">
      <v-text-field v-model="otp" label="OTP" required></v-text-field>
      <v-btn type="submit" color="primary">Confirm</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { useRouter, useRoute } from 'vue-router'
import { Routes } from '@/app/router'
import { showSuccessNotification } from '@/utils/notificationService'

export default defineComponent({
  name: 'ConfirmRegistration',
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const route = useRoute()
    const router = useRouter()

    const otp = ref('')
    const email = route.query.email?.toString() ?? ''

    const confirmRegistration = async () => {
      try {
        await authRepository.confirmRegistration(email, otp.value)
        showSuccessNotification('Success', 'Registration confirmed successfully')
        router.push(Routes.Login)
      } catch (error) {
        //
      }
    }
    return { email, otp, confirmRegistration }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
