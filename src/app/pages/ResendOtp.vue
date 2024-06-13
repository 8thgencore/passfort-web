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
import { useNotification } from '@kyvg/vue3-notification'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ResendOtp',
  setup() {
    const email = ref('')
    const { notify } = useNotification()
    const authRepository = inject<IAuthRepository>('authRepository')
    const router = useRouter()

    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const resendOtp = async () => {
      try {
        await authRepository.resendOtp(email.value)
        notify({ type: 'success', title: 'Success', text: 'OTP code sent successfully' })
        router.push({ name: 'confirm-registration', query: { email: email.value } })
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
