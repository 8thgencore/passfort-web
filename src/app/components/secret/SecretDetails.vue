<template>
  <v-responsive class="border pa-4" v-if="secret.secret_type === 'text'">
    {{ secret.text_secret?.text }}
  </v-responsive>

  <v-responsive class="border pa-4" v-else-if="secret.secret_type === 'password'">
    <div>URL: {{ secret.password_secret?.url }}</div>
    <div>Login: {{ secret.password_secret?.login }}</div>
    <div>Password: {{ secret.password_secret?.password }}</div>
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
