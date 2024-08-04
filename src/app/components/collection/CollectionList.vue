<template>
  <v-list class="collection-list">
    <v-list-item
      v-for="collection in collections"
      :key="collection.id.toString()"
      @click="handleCollectionSelected(collection)"
    >
      <v-list-item>
        <v-list-item-title>{{ collection.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ collection.description }}</v-list-item-subtitle>
      </v-list-item>
    </v-list-item>
    <v-list-item @click="handleLoadMoreCollections" class="load-more">
      <v-list-item>
        <v-list-item-title>
          <v-icon left>mdi-chevron-down</v-icon> Load More Collections
        </v-list-item-title>
      </v-list-item>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Collection } from '@/domain/collection'

export default defineComponent({
  name: 'CollectionList',
  props: {
    collections: {
      type: Array as PropType<Collection[]>,
      required: true
    }
  },
  emits: ['collectionSelected', 'loadMoreCollections'],
  setup(props, { emit }) {
    const handleCollectionSelected = (collection: Collection) => {
      emit('collectionSelected', collection)
    }

    const handleLoadMoreCollections = () => {
      emit('loadMoreCollections')
    }

    return {
      handleCollectionSelected,
      handleLoadMoreCollections
    }
  }
})
</script>
