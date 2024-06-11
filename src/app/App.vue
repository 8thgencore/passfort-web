<template>
  <v-app>
    <!-- Navbar -->
    <MainNavbar />

    <!-- Content -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Notification container -->
    <notifications />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainNavbar from '@/app/components/layout/MainNavbar.vue'

export default defineComponent({
  name: 'App',
  components: {
    MainNavbar
  }
})
</script>

<style>
@import './assets/base.css';
</style>
