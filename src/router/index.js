import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CustomGuide from '../components/CustomGuide.vue'
import AfterSales from '../components/AfterSales.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/custom-guide',
    name: 'CustomGuide',
    component: CustomGuide
  },
  {
    path: '/after-sales',
    name: 'AfterSales',
    component: AfterSales
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 