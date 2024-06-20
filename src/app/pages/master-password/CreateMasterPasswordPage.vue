<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Create Master Password</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createMasterPassword">
              <v-text-field
                v-model="password"
                label="Master Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" block>Create</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { IMasterPasswordRepository } from '@/repositories/interfaces/IMasterPasswordRepository'
import { showSuccessNotification } from '@/utils/notificationService'
import { useRouter } from 'vue-router'
import { Routes } from '@/app/router'

export default defineComponent({
  setup() {
    const masterPasswordRepository = inject<IMasterPasswordRepository>('masterPasswordRepository')
    if (!masterPasswordRepository) {
      throw new Error('masterPasswordRepository is not provided')
    }

    const router = useRouter()

    const password = ref('')

    const createMasterPassword = async () => {
      try {
        await masterPasswordRepository.createMasterPassword(password.value)
        showSuccessNotification('Success', 'Master password created successfully')
        router.push({ name: Routes.Profile })
      } catch (error) {
        console.error('Failed to create master password', error)
      }
    }

    return { password, createMasterPassword }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
