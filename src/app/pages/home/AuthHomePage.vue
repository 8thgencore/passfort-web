<template>
  <v-container>
    <v-navigation-drawer app v-model="drawer" permanent>
      <CollectionList
        :key="collections.length"
        ref="collectionListComponent"
        :collections="collections as Collection[]"
        @collectionSelected="selectCollection"
        @loadMoreCollections="loadCollections"
      />
      <v-list-item @click="openCreateCollectionDialog" class="add-collection">
        <v-list-item>
          <v-list-item-title>
            <v-icon left>mdi-plus</v-icon>
            Add Collection
          </v-list-item-title>
        </v-list-item>
      </v-list-item>
    </v-navigation-drawer>
    <v-container>
      <CollectionDetail
        v-if="selectedCollection"
        :collection="selectedCollection as Collection"
        @collectionUpdated="handleCollectionUpdated"
        @collectionDeleted="handleCollectionDeleted"
      />
    </v-container>

    <!-- Dialogs -->
    <CreateMasterPasswordDialog v-model="showMasterPasswordDialog" @close="loadCollections" />
    <ActivateMasterPasswordDialog
      v-model="showActivateMasterPasswordDialog"
      @close="loadCollections"
    />
    <AddCollectionDialog
      v-model="isCreateCollectionDialogVisible"
      @collectionAdded="handleCollectionAdded"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import CollectionList from '@/app/components/collection/CollectionList.vue'
import CollectionDetail from '@/app/components/collection/CollectionDetail.vue'
import AddCollectionDialog from '@/app/components/collection/AddCollectionDialog.vue'
import CreateMasterPasswordDialog from '@/app/pages/master-password/CreateMasterPasswordDialog.vue'
import ActivateMasterPasswordDialog from '@/app/pages/master-password/ActivateMasterPasswordDialog.vue'
import { ICollectionRepository } from '@/repositories/interfaces/ICollectionRepository'
import { IMasterPasswordRepository } from '@/repositories/interfaces/IMasterPasswordRepository'
import { useRouter } from 'vue-router'
import { Collection } from '@/domain/collection'
import { getErrorMessage } from '@/utils/errorHandler'
import { AxiosError } from 'axios'
import useUser from '@/composables/useUser'

export default defineComponent({
  components: {
    CollectionList,
    CollectionDetail,
    AddCollectionDialog,
    CreateMasterPasswordDialog,
    ActivateMasterPasswordDialog
  },
  setup() {
    const masterPasswordRepository = inject<IMasterPasswordRepository>('masterPasswordRepository')
    const collectionRepository = inject<ICollectionRepository>('collectionRepository')
    const router = useRouter()

    if (!masterPasswordRepository || !collectionRepository) {
      throw new Error('Repository is not provided')
    }

    const { isSetMasterPassword } = useUser()

    const drawer = ref(true)

    const collections = ref<Collection[]>([])
    const selectedCollection = ref<Collection | null>(null)
    const isCreateCollectionDialogVisible = ref<boolean>(false)
    const skip = ref(0)
    const limit = 10
    const isFetching = ref(false)
    const allCollectionLoaded = ref(false)

    const showMasterPasswordDialog = ref(false)
    const showActivateMasterPasswordDialog = ref(false)

    const checkMasterPassword = async () => {
      showMasterPasswordDialog.value = !isSetMasterPassword
    }

    const loadCollections = async () => {
      if (isFetching.value || allCollectionLoaded.value) return
      isFetching.value = true
      try {
        const newCollections = await collectionRepository.getCollections({
          limit,
          skip: skip.value
        })
        if (newCollections.length < limit) {
          allCollectionLoaded.value = true
        }
        collections.value.push(...newCollections)
        skip.value += limit
      } catch (error) {
        if (error instanceof AxiosError) {
          if (getErrorMessage(error) === 'master password validation has expired') {
            showActivateMasterPasswordDialog.value = true
          } else {
            console.error('Failed to load collections', error)
          }
        } else {
          console.error('Failed to load collections', error)
        }
      } finally {
        isFetching.value = false
      }
    }

    const selectCollection = (collection: Collection) => {
      selectedCollection.value = collection
    }

    const openCreateCollectionDialog = () => {
      isCreateCollectionDialogVisible.value = true
    }

    const handleCollectionAdded = (newCollection: Collection) => {
      collections.value.unshift(newCollection)
    }

    const handleCollectionUpdated = (updatedCollection: Collection) => {
      const index = collections.value.findIndex(
        (collection) => collection.id === updatedCollection.id
      )
      if (index !== -1) {
        collections.value.splice(index, 1, updatedCollection)
        if (selectedCollection.value && selectedCollection.value.id === updatedCollection.id) {
          selectedCollection.value = updatedCollection
        }
      }
    }

    const handleCollectionDeleted = (deletedCollectionId: string) => {
      collections.value = collections.value.filter(
        (collection) => collection.id.value !== deletedCollectionId
      )
      if (selectedCollection.value && selectedCollection.value.id.value === deletedCollectionId) {
        selectedCollection.value = null
      }
    }

    // MasterPassword
    const closeMasterPasswordDialog = () => {
      router.back()
    }

    const closeActivateMasterPasswordDialog = () => {
      router.back()
    }

    onMounted(() => {
      checkMasterPassword()
      loadCollections()
    })

    return {
      drawer,
      collections,
      selectedCollection,
      showMasterPasswordDialog,
      showActivateMasterPasswordDialog,
      loadCollections,
      closeMasterPasswordDialog,
      closeActivateMasterPasswordDialog,
      selectCollection,
      openCreateCollectionDialog,
      isCreateCollectionDialogVisible,
      handleCollectionAdded,
      handleCollectionUpdated,
      handleCollectionDeleted
    }
  }
})
</script>

<style>
.add-collection {
  background-color: rgb(var(--v-theme-surface));
  border-top: 1px solid #ddd;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
