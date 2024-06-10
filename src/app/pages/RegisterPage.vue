<template>
  <v-container>
    <v-form @submit.prevent="onSubmit">
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')

    const email = ref('')
    const name = ref('')
    const password = ref('')
    const router = useRouter()

    const onSubmit = async () => {
      try {
        await authRepository.register(email.value, name.value, password.value)
        router.push('/login')
      } catch (error) {
        console.error('Registration failed', error)
      }
    }

    return { email, name, password, onSubmit }
  }
})
</script>

<style scoped>
/* Добавьте стиль по вашему желанию */
</style>
