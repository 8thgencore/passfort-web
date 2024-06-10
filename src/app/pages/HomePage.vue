<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-4xl font-bold mb-4">Добро пожаловать в Парольный менеджер</h1>
    <p class="text-xl text-center max-w-2xl">
      Этот менеджер паролей позволяет безопасно хранить и управлять вашими паролями. Вы можете
      создавать, редактировать и удалять пароли, а также получать доступ к ним в любое время.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage'
})
</script>
