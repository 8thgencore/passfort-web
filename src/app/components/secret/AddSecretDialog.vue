<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title>Add Secret</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="name" label="Name" />
          <v-text-field v-model="description" label="Description" />
          <v-select v-model="secretType" label="Secret Type" :items="secretTypes" />
          <v-text-field v-if="secretType === 'text'" v-model="textSecret" label="Text" />
          <v-text-field v-if="secretType === 'password'" v-model="url" label="URL" />
          <v-text-field v-if="secretType === 'password'" v-model="login" label="Login" />
          <v-text-field
            v-if="secretType === 'password'"
            v-model="password"
            label="Password"
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addSecret">Add</v-btn>
        <v-btn color="secondary" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { SecretType } from '@/domain/secretType'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    collectionId: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const dialog = ref(true)
    const name = ref('')
    const description = ref('')
    const secretType = ref('')
    const textSecret = ref('')
    const url = ref('')
    const login = ref('')
    const password = ref('')
    const secretTypes = ref(['text', 'password'])

    const addSecret = () => {
      const secretData: any = {
        name: name.value,
        description: description.value,
        secretType: secretType.value
      }

      if (secretType.value === SecretType.TEXT) {
        secretData.textSecret = textSecret.value
      } else if (secretType.value === SecretType.PASSWORD) {
        secretData.url = url.value
        secretData.login = login.value
        secretData.password = password.value
      }

      emit('add-secret', secretData)
      clearFields()
      emit('update:dialog', false)
    }

    const cancel = () => {
      clearFields()
      emit('update:dialog', false)
    }

    const clearFields = () => {
      name.value = ''
      description.value = ''
      secretType.value = ''
      textSecret.value = ''
      url.value = ''
      login.value = ''
      password.value = ''
    }

    return {
      dialog,
      name,
      description,
      secretType,
      textSecret,
      url,
      login,
      password,
      secretTypes,
      addSecret,
      cancel
    }
  }
})
</script>
