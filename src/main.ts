import { createApp } from 'vue'
import App from '@/app/App.vue'
import { createPinia } from 'pinia'
import router from '@/app/router'
import vuetify from '@/app/plugins/vuetify'

import { HttpClient } from '@/services/http/HttpClient'
import { AuthClient } from '@/services/auth/AuthClient'
import { AuthRepository } from '@/repositories/AuthRepository'
import { AuthStore, useAuthStore } from '@/store/modules/auth/authStore'
import Notifications from '@kyvg/vue3-notification'

import { setupInterceptors } from '@/services/http/interceptors'

// Создание приложения Vue
const app = createApp(App)

// Создание экземпляра Pinia
const pinia = createPinia()

app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(Notifications)

//  DI
const httpClient = new HttpClient('http://94.131.113.75:8700/v1')
setupInterceptors(httpClient.instance)

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
