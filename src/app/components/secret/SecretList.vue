<template>
  <v-card class="mb-4">
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
              secret.secret_type
            }}</v-list-item-subtitle>

            <v-list-item-action>
              <v-btn icon @click.stop="toggleSecret(secret)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-action>
              <v-btn icon @click.stop="editSecret(secret)">
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
  </v-card>

      <!-- Dialogs -->
<add-secret-dialog />
<edit-secret-dialog />

</template>

<script lang="ts">
import { defineComponent, ref, inject, watch } from 'vue'
import { Secret } from '@/domain/secret'
import { ISecretRepository } from '@/repositories/interfaces/ISecretRepository'
import SecretDetails from '@/app/components/secret/SecretDetails.vue'
import AddSecretDialog from '@/app/components/secret/AddSecretDialog.vue'
import EditSecretDialog from '@/app/components/secret/EditSecretDialog.vue'

export default defineComponent({
  name: 'SecretList',
  components: { SecretDetails },
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

    const loadSecrets = async () => {
      try {
        const loadedSecrets = await secretRepository.listSecrets(
          props.collectionId,
          skip.value,
          limit
        )

        if (loadedSecrets.secrets == null) {
          allSecretsLoaded.value = true
          return
        }
        if (loadedSecrets.secrets.length < limit) {
          allSecretsLoaded.value = true
        } else {
          allSecretsLoaded.value = false
        }

        secrets.value = [...secrets.value, ...loadedSecrets.secrets]
        skip.value += limit
      } catch (error) {
        console.error('Failed to load secrets', error)
      }
    }

    const toggleSecret = async (secret: Secret) => {
      if (!secret.show) {
        try {
          const detailedSecret = await secretRepository.getSecret(props.collectionId, secret.id)
          if (detailedSecret.secret_type === 'text') {
            secret.text_secret = detailedSecret.text_secret
          } else if (detailedSecret.secret_type === 'password') {
            secret.password_secret = detailedSecret.password_secret
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

    const addSecret = async () => {
      // Открываем диалоговое окно для добавления секрета
      const dialogRef = await dialogService.open(AddSecretDialog, {
        props: {
          collectionId: props.collectionId
        }
      })

      // Если пользователь подтвердил добавление секрета
      if (dialogRef.data) {
        try {
          const newSecret = await secretRepository.addSecret(
            props.collectionId,
            dialogRef.data.name,
            dialogRef.data.description,
            dialogRef.data.secretType,
            dialogRef.data.secretValue
          )

          secrets.value.push(newSecret)
        } catch (error) {
          console.error('Failed to add secret', error)
        }
      }
    }

    const editSecret = async (secret: Secret) => {
      // Открываем диалоговое окно для редактирования секрета
      const dialogRef = await dialogService.open(EditSecretDialog, {
        props: {
          secret: secret
        }
      })

      // Если пользователь подтвердил редактирование секрета
      if (dialogRef.data) {
        try {
          const updatedSecret = await secretRepository.updateSecret(
            props.collectionId,
            secret.id,
            dialogRef.data.name,
            dialogRef.data.description,
            dialogRef.data.secretType,
            dialogRef.data.secretValue
          )

          const index = secrets.value.findIndex((s) => s.id === secret.id)
          if (index !== -1) {
            secrets.value.splice(index, 1, updatedSecret)
          }
        } catch (error) {
          console.error('Failed to update secret', error)
        }
      }
    }

    const deleteSecret = async (secret: Secret) => {
      try {
        await secretRepository.deleteSecret(props.collectionId, secret.id)
        const index = secrets.value.findIndex((s) => s.id === secret.id)
        if (index !== -1) {
          secrets.value.splice(index, 1)
        }
      } catch (error) {
        console.error('Failed to delete secret', error)
      }
    }

    loadSecrets()

    return {
      secrets,
      loadMoreSecrets,
      toggleSecret,
      addSecret,
      editSecret,
      deleteSecret,
      allSecretsLoaded
    }
  }
})
</script>
