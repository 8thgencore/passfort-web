<template>
  <v-container>
    <v-card>
      <v-card-title>User Information</v-card-title>
      <v-card-text>
        <div>Email: {{ user.email }}</div>
        <div>Name: {{ user.name }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="goToChangePassword">Change Password</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { IUserRepository } from '@/repositories/interfaces/IUserRepository'
import { Routes } from '@/app/router'

export default defineComponent({
  setup() {
    const userRepository = inject<IUserRepository>('userRepository')
    if (!userRepository) {
      throw new Error('userRepository is not provided')
    }

    const user = ref({ email: '', name: '' })
    const router = useRouter()

    const loadUserData = async () => {
      try {
        const userData = await userRepository.getUserInfo()
        user.value = userData
      } catch (error) {
        console.error('Failed to load user data', error)
      }
    }

    const goToChangePassword = () => {
      router.push(Routes.ChangePassword)
    }

    onMounted(() => {
      loadUserData()
    })

    return { user, goToChangePassword }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
