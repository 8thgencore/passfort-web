<template>
  <v-container>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="oldPassword"
        label="Old Password"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="newPassword"
        label="New Password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Change Password</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Routes } from '@/app/router'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { showSuccessNotification } from '@/utils/notificationService'
import { defineComponent, ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const authRepository = inject<IAuthRepository>('authRepository')
    if (!authRepository) {
      throw new Error('authRepository is not provided')
    }

    const router = useRouter()
    const oldPassword = ref('')
    const newPassword = ref('')

    // Check if the user is authenticated on component mount
    // onMounted(() => {
    //   if (!authRepository.isAuthenticated()) {
    //     router.push(Routes.Login)
    //   }
    // })

    const onSubmit = async () => {
      try {
        await authRepository.changePassword(newPassword.value, oldPassword.value)
        showSuccessNotification('Success', 'Password changed successfully')
      } catch (error) {
        console.error('Password change failed', error)
      }
    }

    return { oldPassword, newPassword, onSubmit }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
