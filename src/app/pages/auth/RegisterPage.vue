<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Registration</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field v-model="email" label="Email" required></v-text-field>
              <v-text-field v-model="name" label="Name" required></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Register</v-btn>
            </v-form>
            <v-btn @click="goToResendOtp" color="secondary" class="mt-2" outlined>Resend OTP</v-btn>
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

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const email = ref('')
    const name = ref('')
    const password = ref('')
    const router = useRouter()

    const onSubmit = async () => {
      try {
        await authRepository.register(email.value, name.value, password.value)
        router.push({ name: Routes.ConfirmRegistration, query: { email: email.value } })
      } catch (error) {
        console.error('Registration failed', error)
      }
    }

    const goToResendOtp = () => {
      router.push(Routes.ResendOtp)
    }

    return { email, name, password, onSubmit, goToResendOtp }
  }
})
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
