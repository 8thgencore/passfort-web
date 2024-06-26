<template>
  <v-container>
    <v-navigation-drawer app>
      <collection-list
        :collections="collections as Collection[]"
        @collectionSelected="selectCollection"
        @addCollection="showAddCollectionDialog"
      />
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <collection-detail
          v-if="selectedCollection"
          :collection="selectedCollection as Collection"
          @collectionUpdated="loadCollections"
        />
      </v-container>
    </v-main>
    <add-collection-dialog
      v-model="isAddCollectionDialogVisible"
      @collectionAdded="loadCollections"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import CollectionList from '@/app/pages/collection/CollectionList.vue'
import CollectionDetail from '@/app/pages/collection/CollectionDetail.vue'
import AddCollectionDialog from '@/app/pages/collection/AddCollectionDialog.vue'
import { Collection } from '@/domain/collection'
import { EntityId } from '@/domain/common/entityId'

export default defineComponent({
  components: {
    CollectionList,
    CollectionDetail,
    AddCollectionDialog
  },
  setup() {
    const collections = ref<Collection[]>([])
    const selectedCollection = ref<Collection | null>(null)
    const isAddCollectionDialogVisible = ref(false)

    const loadCollections = async () => {
      collections.value = await fetchCollections()
    }

    const selectCollection = (collection: Collection) => {
      selectedCollection.value = collection
    }

    const showAddCollectionDialog = () => {
      isAddCollectionDialogVisible.value = true
    }

    onMounted(loadCollections)

    return {
      collections,
      selectedCollection,
      isAddCollectionDialogVisible,
      selectCollection,
      showAddCollectionDialog,
      loadCollections
    }
  }
})

const fetchCollections = async (): Promise<Collection[]> => {
  return [
    new Collection(
      EntityId.generate(),
      'Collection 1',
      'Description 1',
      '123',
      '12321',
      new Date(Date.now()),
      new Date(Date.now())
    )
  ]
}
</script>
