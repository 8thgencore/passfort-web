<template>
  <v-card class="mb-4">
    <v-btn class="ma-4 mb-0" color="primary" @click="openAddDialog">Add Secret</v-btn>
    <v-list>
      <v-list-item v-for="secret in secrets" :key="secret.id" class="mb-2">
        <div class="d-flex justify-space-between pa-2 mb-2">
          <v-list-item-content class="justify-start">
            <v-list-item-title class="font-weight-bold">{{ secret.name }}</v-list-item-title>
            <v-list-item-subtitle class="text--secondary">{{
              secret.description
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <div class="d-flex align-center justify-end">
            <v-list-item-subtitle class="text--secondary mr-4">{{
              secret.secretType
            }}</v-list-item-subtitle>
            <v-list-item-action class="mr-2">
              <v-btn icon @click.stop="toggleSecret(secret)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action class="mr-2">
              <v-btn icon @click.stop="openEditDialog(secret)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon @click.stop="deleteSecret(secret)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </div>
        </div>
        <template v-if="secret.show">
          <secret-details :secret="secret" class="mb-4" />
        </template>
        <v-divider v-if="secret !== secrets[secrets.length - 1]" />
      </v-list-item>
    </v-list>
    <v-btn v-if="!allSecretsLoaded" color="primary" @click="loadMoreSecrets">Load More</v-btn>

    <!-- Dialogs -->
    <add-secret-dialog
      v-model="showAddDialog"
      @update:dialog="showAddDialog = $event"
      @add-secret="handleAddSecret"
      :collection-id="collectionId"
    />
    <edit-secret-dialog
      v-model="showEditDialog"
      @update:dialog="showEditDialog = $event"
      :secret="selectedSecret"
      @edit-secret="handleEditSecret"
    />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch, Ref } from 'vue'
import { Secret } from '@/domain/secret'
import { ISecretRepository } from '@/repositories/interfaces/ISecretRepository'
import SecretDetails from '@/app/components/secret/SecretDetails.vue'
import AddSecretDialog from '@/app/components/secret/AddSecretDialog.vue'
import EditSecretDialog from '@/app/components/secret/EditSecretDialog.vue'
import { SecretType } from '@/domain/secretType'

export default defineComponent({
  name: 'SecretList',
  components: { SecretDetails, AddSecretDialog, EditSecretDialog },
  props: {
    collectionId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const secretRepository = inject<ISecretRepository>('secretRepository')
    if (!secretRepository) {
      throw new Error('Repository is not provided')
    }

    const allSecretsLoaded = ref(true)
    const secrets = ref<Secret[]>([])
    const skip = ref(0)
    const limit = 10
    const showAddDialog = ref(false)
    const showEditDialog = ref(false)
    const selectedSecret = ref<Secret | null>(null) as Ref<Secret | null>

    const loadSecrets = async () => {
      try {
        const loadedSecrets = await secretRepository.listSecrets(
          props.collectionId,
          skip.value,
          limit
        )
        if (loadedSecrets == null || loadedSecrets.length < limit) {
          allSecretsLoaded.value = true
        } else {
          allSecretsLoaded.value = false
        }
        secrets.value = [...secrets.value, ...loadedSecrets]
        skip.value += limit
      } catch (error) {
        console.error('Failed to load secrets', error)
      }
    }

    const toggleSecret = async (secret: Secret) => {
      if (!secret.show) {
        try {
          const detailedSecret = await secretRepository.getSecret(props.collectionId, secret.id)
          if (detailedSecret.secretType === SecretType.TEXT) {
            secret.textSecret = detailedSecret.textSecret
          } else if (detailedSecret.secretType === SecretType.PASSWORD) {
            secret.passwordSecret = detailedSecret.passwordSecret
          }
          secret.show = true
        } catch (error) {
          console.error('Failed to load secret details', error)
        }
      } else {
        secret.show = false
      }
    }

    const loadMoreSecrets = async () => {
      await loadSecrets()
    }

    const openAddDialog = () => {
      showAddDialog.value = true
    }

    const openEditDialog = (secret: Secret) => {
      selectedSecret.value = secret
      showEditDialog.value = true
    }

    const handleAddSecret = async (newSecret: Secret) => {


      secrets.value.push(newSecret)
    }

    const handleEditSecret = async (updatedSecret: Secret) => {
      const index = secrets.value.findIndex((s) => s.id == updatedSecret.id)
      if (index !== -1) {
        secrets.value.splice(index, 1, updatedSecret)
      }
    }

    const deleteSecret = async (secret: Secret) => {
      try {
        await secretRepository.deleteSecret(props.collectionId, secret.id)
        const index = secrets.value.findIndex((s) => s.id == secret.id)
        if (index !== -1) {
          secrets.value.splice(index, 1)
        }
      } catch (error) {
        console.error('Failed to delete secret', error)
      }
    }

    loadSecrets()

    watch(
      () => props.collectionId,
      () => {
        secrets.value = []
        skip.value = 0
        allSecretsLoaded.value = true
        loadSecrets()
      },
      { immediate: true }
    )

    return {
      secrets,
      loadMoreSecrets,
      toggleSecret,
      openAddDialog,
      openEditDialog,
      deleteSecret,
      showAddDialog,
      showEditDialog,
      selectedSecret,
      allSecretsLoaded,
      handleAddSecret,
      handleEditSecret
    }
  }
})
</script>
