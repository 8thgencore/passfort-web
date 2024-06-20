<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Profile Information</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Name</v-list-item-title>
                  <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Role</v-list-item-title>
                  <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Password Management</v-card-title>
          <v-card-text>
            <v-subheader>Change Password</v-subheader><br />
            <div class="mb-4">
              <v-btn color="primary" @click="goToChangePassword">Change Password</v-btn>
            </div>
            <v-subheader>Master Password Management</v-subheader>
            <div class="mb-4">
              <v-btn color="secondary" @click="goToCreateMasterPassword"
                >Create Master Password</v-btn
              >
              <v-btn color="secondary" class="ml-2" @click="goToChangeMasterPassword"
                >Change Master Password</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { IUserRepository } from '@/repositories/interfaces/IUserRepository'
import { Routes } from '@/app/router'

export default defineComponent({
  setup() {
    const userRepository = inject<IUserRepository>('userRepository')
    if (!userRepository) {
      throw new Error('userRepository is not provided')
    }

    const user = ref({ email: '', name: '', role: '' })
    const router = useRouter()

    const loadUserData = async () => {
      try {
        const userData = await userRepository.getUserInfo()
        user.value = userData
      } catch (error) {
        console.error('Failed to load user data', error)
      }
    }

    const goToChangePassword = () => {
      router.push({ name: Routes.ChangePassword })
    }

    const goToCreateMasterPassword = () => {
      router.push({ name: Routes.CreateMasterPassword })
    }

    const goToChangeMasterPassword = () => {
      router.push({ name: Routes.ChangeMasterPassword })
    }

    onMounted(() => {
      loadUserData()
    })

    return { user, goToChangePassword, goToCreateMasterPassword, goToChangeMasterPassword }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
