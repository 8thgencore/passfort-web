<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src="https://www.clipartmax.com/png/full/153-1532892_disaster-recovery-services-tech-process.png"
          alt="Security"
          class="mb-6"
          contain
          height="200px"
        ></v-img>
        <h1 class="text-h2 font-weight-bold mb-4">Welcome to PassFort</h1>
        <p class="text-subtitle-1 mb-6">
          This password manager allows you to securely store and manage your passwords. You can
          create, edit, and delete passwords, as well as access them at any time.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-img :src="secureVaultImage" alt="Secure Vault" height="200px" cover></v-img>
          <v-card-title>Secure Vault</v-card-title>
          <v-card-text>
            Create your own collections of secrets. Secrets can be passwords or textual information.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-img
            :src="passwordManagementImage"
            alt="Password Management"
            height="200px"
            cover
          ></v-img>
          <v-card-title>Password Management</v-card-title>
          <v-card-text>
            Manage your passwords with ease. Store, edit, and delete them whenever you need.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-img :src="textInformationImage" alt="Text Information" height="200px" cover></v-img>
          <v-card-title>Text Information</v-card-title>
          <v-card-text>
            Safely store important text information. Access it securely anytime.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import secureVaultImage from '@/app/assets/images/secure-vault.jpg'
import passwordManagementImage from '@/app/assets/images/password-management.jpg'
import textInformationImage from '@/app/assets/images/text-information.webp'

export default defineComponent({
  name: 'UnauthHomePage',
  data() {
    return {
      secureVaultImage,
      passwordManagementImage,
      textInformationImage
    }
  }
})
</script>

<style scoped></style>
