<template>
  <v-container>
    <v-navigation-drawer app v-model="drawer" permanent>
      <collection-list
        ref="collectionListComponent"
        :collections="collections as Collection[]"
        @collectionSelected="selectCollection"
        @loadMoreCollections="loadCollections"
      />
      <v-list-item @click="openCreateCollectionDialog" class="add-collection">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon left>mdi-plus</v-icon>
            Add Collection
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-container>
      <collection-detail
        v-if="selectedCollection"
        :collection="selectedCollection as Collection"
        @collectionUpdated="handleCollectionUpdated"
        @collectionDeleted="handleCollectionDeleted"
      />
    </v-container>

    <!-- Dialogs -->
    <create-master-password-dialog v-model="showMasterPasswordDialog" @close="loadCollections" />
    <activate-master-password-dialog
      v-model="showActivateMasterPasswordDialog"
      @close="loadCollections"
    />
    <add-collection-dialog
      v-model="isCreateCollectionDialogVisible"
      @collectionAdded="handleCollectionAdded"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import CollectionList from '@/app/pages/collection/CollectionList.vue'
import CollectionDetail from '@/app/pages/collection/CollectionDetail.vue'
import AddCollectionDialog from '@/app/pages/collection/AddCollectionDialog.vue'
import CreateMasterPasswordDialog from '@/app/pages/master-password/CreateMasterPasswordDialog.vue'
import ActivateMasterPasswordDialog from '@/app/pages/master-password/ActivateMasterPasswordDialog.vue'
import { IUserRepository } from '@/repositories/interfaces/IUserRepository'
import { IMasterPasswordRepository } from '@/repositories/interfaces/IMasterPasswordRepository'
import { Collection } from '@/domain/collection'
import { ICollectionRepository } from '@/repositories/interfaces/ICollectionRepository'
import { getErrorMessage } from '@/utils/errorHandler'
import { AxiosError } from 'axios'

export default defineComponent({
  components: {
    CollectionList,
    CollectionDetail,
    AddCollectionDialog,
    CreateMasterPasswordDialog,
    ActivateMasterPasswordDialog
  },
  setup() {
    const userRepository = inject<IUserRepository>('userRepository')
    const masterPasswordRepository = inject<IMasterPasswordRepository>('masterPasswordRepository')
    const collectionRepository = inject<ICollectionRepository>('collectionRepository')
    const router = useRouter()

    if (!userRepository || !masterPasswordRepository || !collectionRepository) {
      throw new Error('Repository is not provided')
    }

    const collections = ref<Collection[]>([])
    const selectedCollection = ref<Collection | null>(null)
    const skip = ref(1)
    const limit = 10
    const isFetching = ref(false)
    const allCollectionLoaded = ref(false)

    const user = ref({
      email: '',
      name: '',
      role: '',
      master_password_set: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const showMasterPasswordDialog = ref(false)
    const showActivateMasterPasswordDialog = ref(false)
    const isCreateCollectionDialogVisible = ref(false)
    const drawer = ref(true)

    const loadUserData = async () => {
      try {
        const userData = await userRepository.getUserInfo()
        user.value = userData
        if (!user.value.master_password_set) {
          showMasterPasswordDialog.value = true
        }
      } catch (error) {
        console.error('Failed to load user data', error)
      }
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
        skip.value += 1
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

    const closeMasterPasswordDialog = () => {
      router.back()
    }

    const closeActivateMasterPasswordDialog = () => {
      router.back()
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
        (collection) => collection.id.value === updatedCollection.id.value
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

    onMounted(() => {
      loadUserData()
      loadCollections()
    })

    return {
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
      drawer,
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
  padding: 16px;
  border-top: 1px solid #ddd;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
