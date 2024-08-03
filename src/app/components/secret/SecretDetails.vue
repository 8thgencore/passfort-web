<template>
  <v-responsive class="border pa-4" v-if="secret.secretType === 'text'">
    {{ secret.textSecret?.text }}
  </v-responsive>

  <v-responsive class="border pa-4" v-else-if="secret.secretType === 'password'">
    <div>URL: {{ secret.passwordSecret?.url }}</div>
    <div>Login: {{ secret.passwordSecret?.login }}</div>
    <div>Password: {{ secret.passwordSecret?.password }}</div>
  </v-responsive>
</template>

<script>
export default {
  props: {
    secret: {
      type: Object,
      required: true
    }
  }
}
</script>
