import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import LoginView from '@/views/LoginView.vue'
import ErrorView from '@/views/ErrorView.vue'
import mainRoutes from './mainRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: mainRoutes
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView
    }
  ]
})

export default router
