import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UserData from '../views/UserData.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    alias: '/'
  },
  {
    path: '/data',
    name: 'data',
    component: UserData
  },
  {
    path: '/:notFound(.*)',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
