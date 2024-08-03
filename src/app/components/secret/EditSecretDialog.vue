<!-- EditSecretDialog.vue -->
<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title>Edit Secret</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="name" label="Name" />
          <v-text-field v-model="description" label="Description" />
          <v-text-field v-model="secretValue" label="Secret Value" />
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
    const secretValue = ref('')

    // Watch for changes in the secret prop and update local state accordingly
    watch(
      () => props.secret,
      (newSecret) => {
        if (newSecret) {
          name.value = newSecret.name
          description.value = newSecret.description
          secretType.value = newSecret.secretType
          secretValue.value =
            newSecret.secretType === 'password'
              ? (newSecret.passwordSecret?.password ?? '')
              : (newSecret.textSecret?.text ?? '')
        }
      },
      { immediate: true }
    )

    const editSecret = () => {
      emit('update:dialog', false)
      emit('edit-secret', {
        ...props.secret,
        name: name.value,
        description: description.value,
        secretType: secretType.value,
        secretValue: secretValue.value
      })
    }

    const cancel = () => {
      emit('update:dialog', false)
    }

    return {
      dialog,
      name,
      description,
      secretType,
      secretValue,
      editSecret,
      cancel
    }
  }
})
</script>
