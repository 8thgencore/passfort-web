<template>
  <div style="max-width: 960px; margin: 0 auto">
    <section>
      <v-container fluid>
        <h2 class="text-h5 text-sm-h5 mb-2">Profile Information</h2>

        <v-row dense>
          <v-col cols="12" sm="4" xs="6">
            <v-card outlined>
              <v-card-text class="d-flex align-center">
                <v-avatar class="icon-background mr-3">
                  <v-icon color="primary">mdi-email</v-icon>
                </v-avatar>
                <div>
                  <div class="font-weight-medium">Email</div>
                  <div>{{ user.email }}</div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" xs="6">
            <v-card outlined>
              <v-card-text class="d-flex align-center">
                <v-avatar class="icon-background mr-3">
                  <v-icon color="primary">mdi-badge-account</v-icon>
                </v-avatar>
                <div>
                  <div class="font-weight-medium">Name</div>
                  <div>{{ user.name }}</div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" xs="6">
            <v-card outlined>
              <v-card-text class="d-flex align-center">
                <v-avatar class="icon-background mr-3">
                  <v-icon color="primary">mdi-shield-account</v-icon>
                </v-avatar>
                <div>
                  <div class="font-weight-medium">Role</div>
                  <div>{{ user.role }}</div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-container fluid>
        <h2 class="text-h5 text-sm-h5 mb-2">Password Management</h2>

        <v-row dense>
          <v-col cols="12" md="8" lg="12">
            <v-row>
              <!-- User Password Section -->
              <v-col cols="12" sm="6">
                <v-card outlined>
                  <v-card-title>User Password</v-card-title>
                  <v-card-text>
                    <v-btn-toggle>
                      <v-btn variant="outlined" @click="goToChangePassword">
                        <v-icon left class="mr-2">mdi-lock-reset</v-icon>
                        Change Password
                      </v-btn>
                    </v-btn-toggle>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Master Password Section -->
              <v-col cols="12" sm="6">
                <v-card outlined>
                  <v-card-title>Master Password</v-card-title>
                  <v-card-text>
                    <v-btn-toggle>
                      <v-btn variant="outlined" @click="goToCreateMasterPassword">
                        <v-icon left class="mr-2">mdi-plus</v-icon>
                        Create
                      </v-btn>
                      <v-btn variant="outlined" @click="goToChangeMasterPassword">
                        <v-icon left class="mr-2">mdi-pencil</v-icon>
                        Change
                      </v-btn>
                    </v-btn-toggle>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
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
.icon-background {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.08); /* Adjust background color */
  border-radius: 4px; /* Adjust border radius if needed */
}
.v-card {
  border: 1px solid rgba(255, 255, 255, 0.12); /* Adjust border color */
  border-radius: 4px; /* Adjust border radius */
  background-color: rgba(0, 0, 0, 0.04); /* Adjust card background color */
  box-shadow: none; /* Remove default shadow */
}

.v-avatar {
  border: 1px solid rgba(255, 255, 255, 0.12); /* Adjust border style */
}
</style>
