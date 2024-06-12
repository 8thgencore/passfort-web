import { createApp } from 'vue'
import App from '@/app/App.vue'
import { createPinia } from 'pinia'
import router from '@/app/router'
import vuetify from '@/app/plugins/vuetify'
import Notifications from '@kyvg/vue3-notification'

// Importing client services and repositories
import { HttpClient } from '@/services/http/HttpClient'
import { AuthClient } from '@/services/auth/AuthClient'
import { AuthRepository } from '@/repositories/AuthRepository'
import { AuthStore, useAuthStore } from '@/store/modules/auth/AuthStore'
import { setupInterceptors } from '@/services/http/interceptors'

// Creating a Vue Application instance
const app = createApp(App)

// Creating a Pinia instance
const pinia = createPinia()

// Connecting the router, Vuetify and Pinia to the application
app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(Notifications)

// Creating instances of the necessary services and storages
const authStore = new AuthStore()
const httpClient = new HttpClient('http://94.131.113.75:8700/v1')
const authClient = new AuthClient(httpClient)

// Creating an instance of the authentication repository
const authRepository = new AuthRepository(authClient, authStore)

// Installing interceptors for processing HTTP requests and responses
setupInterceptors(httpClient.instance, authRepository)

// Providing global dependencies for use in any component
app.provide('httpClient', httpClient)
app.provide('authClient', authClient)
app.provide('authRepository', authRepository)
app.provide('authStore', authStore)

// Mounting an application to an element with the 'app' id
app.mount('#app')
