import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/app/pages/HomePage.vue'
import LoginPage from '@/app/pages/LoginPage.vue'
import RegisterPage from '@/app/pages/RegisterPage.vue'
import LogoutPage from '@/app/pages/LogoutPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/logout', component: LogoutPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
