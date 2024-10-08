<template>
  <div>
    <v-card class="collection-card mb-4">
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ collection.name }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleEditMode">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteCollection" class="ml-2">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div v-if="editMode">
          <v-text-field v-model="name" label="Name"></v-text-field>
          <v-textarea v-model="description" label="Description"></v-textarea>
          <v-btn color="primary mr-2" @click="updateCollection">Save</v-btn>
          <v-btn @click="cancelEdit">Cancel</v-btn>
        </div>
        <div v-else>
          <p>{{ collection.description }}</p>
        </div>
      </v-card-text>
    </v-card>
    <h3 class="text-h5 font-weight-bold mb-4">Secrets</h3>
    <secret-list :collection-id="collection.id.value" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, inject } from 'vue'
import { Collection } from '@/domain/collection'
import { ICollectionRepository } from '@/repositories/interfaces/ICollectionRepository'
import SecretList from '@/app/components/secret/SecretList.vue'

export default defineComponent({
  name: 'CollectionDetail',
  components: { SecretList },
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

    watch(
      () => props.collection,
      (newCollection) => {
        name.value = newCollection.name
        description.value = newCollection.description
        editMode.value = false
      }
    )

    const updateCollection = async () => {
      if (name.value && description.value && props.collection) {
        try {
          const updatedCollection = await collectionRepository.updateCollection(
            props.collection.id.value,
            name.value,
            description.value
          )
          props.collection.name = updatedCollection.name
          props.collection.description = updatedCollection.description
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

    const toggleEditMode = () => {
      editMode.value = !editMode.value
    }

    const cancelEdit = () => {
      editMode.value = false
      name.value = props.collection.name
      description.value = props.collection.description
    }

    return {
      editMode,
      name,
      description,
      updateCollection,
      deleteCollection,
      toggleEditMode,
      cancelEdit
    }
  }
})
</script>

<style scoped>
.collection-card {
  max-width: 600px;
  margin: 0 auto;
}

.v-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
