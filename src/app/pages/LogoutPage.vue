<template>
  <v-container>
    <v-btn @click="logout" color="primary">Logout</v-btn>
  </v-container>
</template>

<script lang="ts">
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const router = useRouter()

    const logout = async () => {
      try {
        await authRepository.logout()
        router.push('/login')
      } catch (error) {
        console.error('Logout failed', error)
      }
    }

    return { logout }
  }
})
</script>

<style scoped>
/* Добавьте стиль по вашему желанию */
</style>
