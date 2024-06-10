<template>
  <v-app>
    <Navbar />
    <v-main class="mt-8 px-8">
      <Description />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/app/components/layout/Navbar.vue'
import Description from '@/app/components/Description.vue'

export default defineComponent({
  components: {
    Navbar,
    Description
  }
})
</script>

<style scoped>
/* Add Tailwind styles here */
</style>
