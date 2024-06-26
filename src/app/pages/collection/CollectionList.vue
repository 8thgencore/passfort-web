<template>
  <v-list>
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
      <v-list-item @click="$emit('addCollection')">
        <v-list-item-content>
          <v-list-item-title> <v-icon left>mdi-plus</v-icon> Add Collection </v-list-item-title>
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
      type: Object as PropType<Collection[]>,
      required: true
    }
  }
})
</script>
