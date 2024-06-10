import { createApp } from 'vue'
import App from './app/App.vue'
import { createPinia } from 'pinia'

import { HttpClient } from './services/http/httpClient'
import { AuthClient } from './services/auth/authClient'
import { AuthRepository } from './repositories/AuthRepository'
import { AuthStore, useAuthStore } from './store/modules/auth/authStore'

const app = createApp(App)
const pinia = createPinia()

const httpClient = new HttpClient('https://api.example.com')
const authClient = new AuthClient(httpClient)
const authStore = new AuthStore()

const authRepository = new AuthRepository(authClient, authStore)

app.use(pinia)
app.mount('#app')

export { authRepository, useAuthStore }
