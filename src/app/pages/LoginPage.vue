<template>
  <v-container>
    <v-form @submit.prevent="onSubmit">
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')

    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const { notify } = useNotification()

    const onSubmit = async () => {
      try {
        await authRepository.login(email.value, password.value)
        router.push('/')
      } catch (error) {
        console.error('Login failed', error)

        notify({
          type: 'error',
          title: 'Login Error',
          text: 'Failed to login. Please check your credentials and try again.'
        })
      }
    }

    return { email, password, onSubmit }
  }
})
</script>

<style scoped>
/* Добавьте стиль по вашему желанию */
</style>
