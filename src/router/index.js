import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/loginpage'
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/loginpage',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/foodpocket',
    name: 'FoodPocket',
    component: () => import('../views/FoodPocket.vue')
  },
  {
    path: '/foodpocket2',
    name: 'FoodPocket2',
    component: () => import('../views/FoodPocket2.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

export default router
