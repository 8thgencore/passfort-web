<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Change Master Password</v-card-title>
          <v-card-text>
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
              <v-btn type="submit" color="primary" block>Change Password</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Routes } from '@/app/router'
import { IAuthRepository } from '@/repositories/interfaces/IAuthRepository'
import { showSuccessNotification } from '@/utils/notificationService'
import { defineComponent, ref, inject } from 'vue'
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

    const onSubmit = async () => {
      try {
        await authRepository.changePassword(newPassword.value, oldPassword.value)
        showSuccessNotification('Success', 'Password changed successfully')
        router.push({ name: Routes.Profile })
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
