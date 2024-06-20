<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Change Master Password</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="changeMasterPassword">
              <v-text-field
                v-model="currentPassword"
                label="Current Master Password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="newPassword"
                label="New Master Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" block>Change</v-btn>
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

export default defineComponent({
  setup() {
    const masterPasswordRepository = inject<IMasterPasswordRepository>('masterPasswordRepository')
    if (!masterPasswordRepository) {
      throw new Error('masterPasswordRepository is not provided')
    }

    const currentPassword = ref('')
    const newPassword = ref('')

    const changeMasterPassword = async () => {
      try {
        await masterPasswordRepository.changeMasterPassword(
          currentPassword.value,
          newPassword.value
        )
        alert('Master password changed successfully')
      } catch (error) {
        console.error('Failed to change master password', error)
      }
    }

    return { currentPassword, newPassword, changeMasterPassword }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
