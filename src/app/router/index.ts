import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/app/pages/HomePage.vue'
import LoginPage from '@/app/pages/LoginPage.vue'
import RegisterPage from '@/app/pages/RegisterPage.vue'
import LogoutPage from '@/app/pages/LogoutPage.vue'
import ConfirmRegistration from '@/app/pages/ConfirmRegistration.vue'
import ResendOtp from '@/app/pages/ResendOtp.vue'

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/login', component: LoginPage, name: 'login' },
  { path: '/register', component: RegisterPage, name: 'register' },
  { path: '/logout', component: LogoutPage, name: 'logout' },
  { path: '/confirm-registration', component: ConfirmRegistration, name: 'confirm-registration' },
  { path: '/resend-otp', component: ResendOtp, name: 'resend-otp' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
