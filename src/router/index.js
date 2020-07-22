import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/foodpocket'
  },
  {
    path: '/',
    name: 'FoodPocket',
    component: () => import('../views/FoodPocket.vue')
  },
  {
    path: '/foodpocket',
    name: 'FoodPocket',
    component: () => import('../views/FoodPocket.vue')
  },
  {
    path: '/loginpage',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
