<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field v-model="email" label="Email" required></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
            <v-btn @click="goToForgotPassword" color="secondary" class="mt-2" outlined
              >Forgot Password</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Routes } from '@/app/router'
import useUser from '@/composables/useUser'

export default defineComponent({
  setup() {
    const { login } = useUser()

    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const onSubmit = async () => {
      await login(email.value, password.value)
      router.push({ name: Routes.Home })
    }

    const goToForgotPassword = () => {
      router.push({ name: Routes.ForgotPassword })
    }

    return { email, password, onSubmit, goToForgotPassword }
  }
})
</script>
