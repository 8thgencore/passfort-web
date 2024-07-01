<template>
  <v-card>
    <v-card-title>
      <span>{{ collection.name }}</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="editMode = !editMode">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="deleteCollection">
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div v-if="editMode">
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-textarea v-model="description" label="Description"></v-textarea>
        <v-btn color="primary" @click="updateCollection">Save</v-btn>
        <v-btn @click="editMode = false">Cancel</v-btn>
      </div>
      <div v-else>
        <p>{{ collection.description }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject } from 'vue'
import { Collection } from '@/domain/collection'
import { ICollectionRepository } from '@/repositories/interfaces/ICollectionRepository'

export default defineComponent({
  name: 'CollectionDetail',
  props: {
    collection: {
      type: Object as PropType<Collection>,
      required: true
    }
  },
  emits: ['collectionUpdated', 'collectionDeleted'],
  setup(props, { emit }) {
    const collectionRepository = inject<ICollectionRepository>('collectionRepository')
    if (!collectionRepository) {
      throw new Error('Repository is not provided')
    }

    const editMode = ref(false)
    const name = ref(props.collection.name)
    const description = ref(props.collection.description)

    const updateCollection = async () => {
      if (name.value && description.value && props.collection) {
        try {
          const updatedCollection = await collectionRepository.updateCollection(
            props.collection.id.value,
            name.value,
            description.value
          )
          emit('collectionUpdated', updatedCollection)
          editMode.value = false
        } catch (error) {
          console.error('Failed to update collection', error)
        }
      }
    }

    const deleteCollection = async () => {
      try {
        await collectionRepository.deleteCollection(props.collection.id.value)
        emit('collectionDeleted', props.collection.id.value)
      } catch (error) {
        console.error('Failed to delete collection', error)
      }
    }

    return {
      editMode,
      name,
      description,
      updateCollection,
      deleteCollection
    }
  }
})
</script>

<style scoped>
.v-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
