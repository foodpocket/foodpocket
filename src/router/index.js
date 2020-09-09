import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '*',
  //   redirect: '/landingpage'
  // },
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/landingpage',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/loginpage',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/foodpocket',
    name: 'FoodPocket',
    component: () => import('../views/FoodPocket.vue'),
    children: [
      {
        path: '',
        name: 'MainPocket',
        component: () => import('../components/pages/MainPocket.vue')
      },
      {
        path: 'choosepocket',
        name: 'ChoosePocket',
        component: () => import('../components/pages/ChoosePocket.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'activee'
})

export default router
