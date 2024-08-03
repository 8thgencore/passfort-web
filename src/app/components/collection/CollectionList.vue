<template>
  <v-list class="collection-list">
    <v-list-item-group>
      <v-list-item
        v-for="collection in collections"
        :key="collection.id.toString()"
        @click="$emit('collectionSelected', collection)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ collection.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ collection.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="$emit('loadMoreCollections')" class="load-more">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon left>mdi-chevron-down</v-icon> Load More Collections
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
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
  emits: ['collectionSelected', 'loadMoreCollections']
})
</script>

<style>
.v-list-item--density-default.v-list-item--one-line:nth-last-child(-n + 1) {
  margin-bottom: 52px;
}
</style>
