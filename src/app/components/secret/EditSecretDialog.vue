<!-- EditSecretDialog.vue -->
<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title>Edit Secret</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="name" label="Name" />
          <v-text-field v-model="description" label="Description" />
          <v-select v-model="secretType" label="Secret Type" :items="secretTypes" />
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    secret: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const dialog = ref(true)
    const name = ref(props.secret.name)
    const description = ref(props.secret.description)
    const secretType = ref(props.secret.secret_type)
    const secretValue = ref(props.secret.secret_value)
    const secretTypes = ref(['text', 'password'])

    const editSecret = () => {
      emit('update:dialog', false)
      emit('edit-secret', {
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
      secretTypes,
      editSecret,
      cancel
    }
  }
})
</script>
