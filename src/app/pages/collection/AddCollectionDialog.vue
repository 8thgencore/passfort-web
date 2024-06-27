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
import { defineComponent, ref, watch, inject } from 'vue'
import { ICollectionRepository } from '@/repositories/interfaces/ICollectionRepository'

export default defineComponent({
  name: 'AddCollectionDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue', 'collectionAdded'],
  setup(props, { emit }) {
    const collectionRepository = inject<ICollectionRepository>('collectionRepository')

    if (!collectionRepository) {
      throw new Error('Repository is not provided')
    }

    const name = ref('')
    const description = ref('')
    const visible = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (newValue) => {
        visible.value = newValue
      }
    )

    const addCollection = async () => {
      if (name.value && description.value) {
        const newCollection = await collectionRepository.createCollection(
          name.value,
          description.value
        )
        emit('collectionAdded', newCollection)
        emit('update:modelValue', false)
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
