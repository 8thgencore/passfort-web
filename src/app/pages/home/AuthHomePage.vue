<template>
  <v-container>
    <v-navigation-drawer app>
      <collection-list
        :collections="collections as Collection[]"
        @collectionSelected="selectCollection"
        @addCollection="openCreateCollectionDialog"
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

    <!-- Dialog for creating master password -->
    <v-dialog v-model="showMasterPasswordDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>Create Master Password</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="masterPassword"
            label="Master Password"
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createMasterPassword">Create</v-btn>
          <v-btn @click="closeMasterPasswordDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for activating master password -->
    <v-dialog v-model="showActivateMasterPasswordDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>Activate Master Password</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="masterPassword"
            label="Master Password"
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="activateMasterPassword">Activate</v-btn>
          <v-btn @click="closeActivateMasterPasswordDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for add collection -->
    <add-collection-dialog
      v-model="isCreateCollectionDialogVisible"
      @collectionAdded="loadCollections"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import CollectionList from '@/app/pages/collection/CollectionList.vue'
import CollectionDetail from '@/app/pages/collection/CollectionDetail.vue'
import AddCollectionDialog from '@/app/pages/collection/AddCollectionDialog.vue'
import { IUserRepository } from '@/repositories/interfaces/IUserRepository'
import { IMasterPasswordRepository } from '@/repositories/interfaces/IMasterPasswordRepository'
import { Collection } from '@/domain/collection'
import { ICollectionRepository } from '@/repositories/interfaces/ICollectionRepository'

export default defineComponent({
  components: {
    CollectionList,
    CollectionDetail,
    AddCollectionDialog
  },
  setup() {
    const userRepository = inject<IUserRepository>('userRepository')
    const masterPasswordRepository = inject<IMasterPasswordRepository>('masterPasswordRepository')
    const collectionRepository = inject<ICollectionRepository>('collectionRepository')
    const router = useRouter()

    if (!userRepository || !masterPasswordRepository || !collectionRepository) {
      throw new Error('Repository is not provided')
    }

    const user = ref({
      email: '',
      name: '',
      role: '',
      master_password_set: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const collections = ref<Collection[]>([])
    const selectedCollection = ref<Collection | null>(null)
    const showMasterPasswordDialog = ref(false)
    const showActivateMasterPasswordDialog = ref(false)
    const masterPassword = ref('')
    const isCreateCollectionDialogVisible = ref(false)

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
      try {
        collections.value = await collectionRepository.getCollections()
      } catch (error) {
        console.error('Failed to load collections', error)
        // TODO:
        // if (error.message === 'master password validation has expired') {
        //   showActivateMasterPasswordDialog.value = true
        // } else {
        //   console.error('Failed to load collections', error)
        // }
      }
    }

    const createMasterPassword = async () => {
      try {
        await masterPasswordRepository.createMasterPassword(masterPassword.value)
        showMasterPasswordDialog.value = false
        loadCollections()
      } catch (error) {
        console.error('Failed to create master password', error)
      }
    }

    const activateMasterPassword = async () => {
      try {
        await masterPasswordRepository.activateMasterPassword(masterPassword.value)
        showActivateMasterPasswordDialog.value = false
        loadCollections()
      } catch (error) {
        console.error('Failed to activate master password', error)
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

    onMounted(() => {
      loadUserData()
    })

    return {
      user,
      collections,
      selectedCollection,
      showMasterPasswordDialog,
      showActivateMasterPasswordDialog,
      masterPassword,
      loadCollections,
      createMasterPassword,
      activateMasterPassword,
      closeMasterPasswordDialog,
      closeActivateMasterPasswordDialog,
      selectCollection,
      openCreateCollectionDialog,
      isCreateCollectionDialogVisible
    }
  }
})
</script>
