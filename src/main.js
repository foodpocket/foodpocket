import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'bootstrap'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('需要驗證')
    const api = '' // 還沒有
    console.log(api)
    next({
      path: '/loginpage'
    })
    // axios.post(api).then((response) => {
    //   console.log(response.data)
    //   if (response.data.success) {
    //     next()
    //   } else {
    //     next({
    //       path: '/login'
    //     })
    //   }
    // })
  } else {
    next()
  }
})
