<template>
  <v-card>
    <v-card-title>Edit Collection</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="updateCollection">
        <v-text-field v-model="collectionName" label="Name"></v-text-field>
        <v-text-field v-model="collectionDescription" label="Description"></v-text-field>
        <v-btn type="submit" color="primary">Save</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { Collection } from '@/domain/collection'

export default defineComponent({
  name: 'CollectionDetail',
  props: {
    collection: {
      type: Object as PropType<Collection>,
      required: true
    }
  },
  setup(props) {
    const collectionName = ref(props.collection.name)
    const collectionDescription = ref(props.collection.description)

    watch(
      () => props.collection,
      (newCollection) => {
        collectionName.value = newCollection.name
        collectionDescription.value = newCollection.description
      }
    )

    const updateCollection = () => {
      // Your logic to update the collection
    }

    return {
      collectionName,
      collectionDescription,
      updateCollection
    }
  }
})
</script>
