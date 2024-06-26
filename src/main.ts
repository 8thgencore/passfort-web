import { createApp } from 'vue'
import App from '@/app/App.vue'
import { createPinia } from 'pinia'
import router, { createAppRouter } from '@/app/router'
import vuetify from '@/app/plugins/vuetify'
import Notifications from '@kyvg/vue3-notification'
import config from '@/config'

// Importing client services and repositories
import { HttpClient } from '@/services/http/HttpClient'
import { AuthClient } from '@/services/auth/AuthClient'
import { AuthRepository } from '@/repositories/AuthRepository'
import { AuthStore } from '@/store/modules/auth/AuthStore'
import { setupInterceptors } from '@/services/http/interceptors'
import { UserRepository } from './repositories/UserRepository'
import { UserClient } from './services/user/UserClient'
import { MasterPasswordClient } from './services/master-password/MasterPasswordClient'
import { MasterPasswordRepository } from './repositories/MasterPasswordRepository'
import { CollectionClient } from './services/collection/CollectionClient'
import { CollectionRepository } from './repositories/CollectionRepository'

// Creating a Vue Application instance
const app = createApp(App)

// Creating a Pinia instance
const pinia = createPinia()

// Connecting the Vuetify and Pinia to the application
app.use(vuetify)
app.use(pinia)
app.use(Notifications)

// Creating instances of the necessary services and storages
const authStore = new AuthStore()
const httpClient = new HttpClient(config.apiBaseUrl)
const authClient = new AuthClient(httpClient)
const userClient = new UserClient(httpClient)
const masterPasswordClient = new MasterPasswordClient(httpClient)
const collectionClient = new CollectionClient(httpClient)

// Creating an instance of the authentication repository
const authRepository = new AuthRepository(authClient, authStore)
const userRepository = new UserRepository(userClient)
const masterPasswordRepository = new MasterPasswordRepository(masterPasswordClient)
const collectionRepository = new CollectionRepository(collectionClient)

// Installing interceptors for processing HTTP requests and responses
setupInterceptors(httpClient.instance, authRepository)

// Providing global dependencies for use in any component
app.provide('httpClient', httpClient)
app.provide('authClient', authClient)
app.provide('masterPasswordClient', masterPasswordClient)
app.provide('authStore', authStore)
app.provide('authRepository', authRepository)
app.provide('userRepository', userRepository)
app.provide('masterPasswordRepository', masterPasswordRepository)
app.provide('collectionRepository', collectionRepository)

// Creating and using router with authRepository
const router = createAppRouter(authRepository)
app.use(router)

// Mounting an application to an element with the 'app' id
app.mount('#app')
