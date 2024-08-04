<!-- EditSecretDialog.vue -->
<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title>Edit Secret</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="name" label="Name" />
          <v-text-field v-model="description" label="Description" />
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
        <v-btn color="primary" @click="editSecret">Edit</v-btn>
        <v-btn color="secondary" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Secret } from '@/domain/secret'
import { SecretType } from '@/domain/secretType'

export default defineComponent({
  props: {
    secret: {
      type: Object as () => Secret | null,
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

    // Watch for changes in the secret prop and update local state accordingly
    watch(
      () => props.secret,
      (newSecret) => {
        if (newSecret) {
          name.value = newSecret.name
          description.value = newSecret.description
          secretType.value = newSecret.secretType
          if (newSecret.secretType === SecretType.PASSWORD) {
            url.value = newSecret.passwordSecret?.url ?? ''
            login.value = newSecret.passwordSecret?.login ?? ''
            password.value = newSecret.passwordSecret?.password ?? ''
          } else {
            textSecret.value = newSecret.textSecret?.text ?? ''
          }
        }
      },
      { immediate: true }
    )

    const editSecret = () => {
      const secretData: any = {
        ...props.secret,
        name: name.value,
        description: description.value,
        secretType: secretType.value
      }

      if (secretType.value === SecretType.TEXT) {
        secretData.textSecret = { text: textSecret.value }
      } else if (secretType.value === SecretType.PASSWORD) {
        secretData.passwordSecret = {
          url: url.value,
          login: login.value,
          password: password.value
        }
      }

      emit('edit-secret', secretData)
      emit('update:dialog', false)
    }

    const cancel = () => {
      emit('update:dialog', false)
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
      editSecret,
      cancel
    }
  }
})
</script>
