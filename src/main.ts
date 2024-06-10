import { createApp } from 'vue'
import App from './app/App.vue'
import { createPinia } from 'pinia'
import router from './app/router'
import vuetify from './app/plugins/vuetify'

import { HttpClient } from './services/http/httpClient'
import { AuthClient } from './services/auth/authClient'
import { AuthRepository } from './repositories/AuthRepository'
import { AuthStore, useAuthStore } from './store/modules/auth/authStore'
import Notifications from '@kyvg/vue3-notification'
import './app/assets/tailwind.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(Notifications)

//  DI
const httpClient = new HttpClient('http://94.131.113.75:8700/v1')
const authClient = new AuthClient(httpClient)
const authStore = new AuthStore()

const authRepository = new AuthRepository(authClient, authStore)

// Provide dependencies globally
app.provide('httpClient', httpClient)
app.provide('authClient', authClient)
app.provide('authRepository', authRepository)
app.provide('authStore', authStore)

// Mount application to element with id 'app'
app.mount('#app')

export const globals = {
  authRepository
}
