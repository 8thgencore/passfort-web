<template>
  <div>
    <auth-home-page v-if="isAuthenticated" />
    <unauth-home-page v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthHomePage from './AuthHomePage.vue'
import UnauthHomePage from './UnauthHomePage.vue'
import useUser from '@/composables/useUser'

export default defineComponent({
  name: 'HomePage',
  components: { AuthHomePage, UnauthHomePage },
  setup() {
    const { isAuthenticated } = useUser()

    return { isAuthenticated }
  }
})
</script>

<style scoped></style>
