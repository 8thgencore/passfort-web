<template>
  <v-dialog v-model="modelValue" max-width="500px" persistent>
    <v-card>
      <v-card-title>Activate Master Password</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onActivateMasterPassword">
          <v-text-field
            v-model="masterPassword"
            label="Master Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" block>Activate</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { IMasterPasswordRepository } from '@/repositories/interfaces/IMasterPasswordRepository'

export default defineComponent({
  name: 'ActivateMasterPasswordDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const masterPassword = ref('')
    const masterPasswordRepository = inject<IMasterPasswordRepository>('masterPasswordRepository')
    if (!masterPasswordRepository) {
      throw new Error('masterPasswordRepository is not provided')
    }

    const onActivateMasterPassword = async () => {
      try {
        await masterPasswordRepository.activateMasterPassword(masterPassword.value)
        emit('update:modelValue', false)
        emit('close')
      } catch (error) {
        console.error('Failed to activate master password', error)
      }
    }

    return {
      masterPassword,
      onActivateMasterPassword
    }
  }
})
</script>
