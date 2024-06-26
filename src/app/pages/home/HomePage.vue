<template>
  <div>
    <auth-home-page v-if="isAuthenticated" />
    <unauth-home-page v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import AuthHomePage from './AuthHomePage.vue'
import UnauthHomePage from './UnauthHomePage.vue'

export default defineComponent({
  name: 'HomePage',
  components: { AuthHomePage, UnauthHomePage },
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const isAuthenticated = computed(() => authRepository.isAuthenticated())

    return { isAuthenticated }
  }
})
</script>

<style scoped></style>
