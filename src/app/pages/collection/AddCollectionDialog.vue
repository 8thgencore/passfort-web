<template>
  <v-dialog v-model="visible" max-width="500">
    <v-card>
      <v-card-title>Add Collection</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Name" v-model="name"></v-text-field>
          <v-textarea label="Description" v-model="description"></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addCollection">Add</v-btn>
        <v-btn variant="text" @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'AddCollectionDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const name = ref('')
    const description = ref('')
    const visible = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (newValue) => {
        visible.value = newValue
      }
    )

    const addCollection = () => {
      if (name.value && description.value) {
        // Logic to add collection
        emit('collectionAdded')
        closeDialog()
      }
    }

    const closeDialog = () => {
      emit('update:modelValue', false)
      name.value = ''
      description.value = ''
    }

    return { name, description, visible, addCollection, closeDialog }
  }
})
</script>

<style scoped></style>
