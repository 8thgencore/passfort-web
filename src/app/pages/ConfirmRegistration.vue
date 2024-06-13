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
import { useNotification } from '@kyvg/vue3-notification'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'ConfirmRegistration',
  setup() {
    const otp = ref('')
    const { notify } = useNotification()
    const authRepository = inject<IAuthRepository>('authRepository')
    const route = useRoute()
    const router = useRouter()

    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const email = route.query.email?.toString() ?? ''

    const confirmRegistration = async () => {
      try {
        await authRepository.confirmRegistration(email, otp.value)
        notify({ type: 'success', title: 'Success', text: 'Registration confirmed successfully' })
        router.push('/login')
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
