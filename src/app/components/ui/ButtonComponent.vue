<template>
  <v-btn :color="color" @click="$emit('click')">
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    color: {
      type: String as PropType<string>,
      default: 'primary'
    }
  }
})
</script>
