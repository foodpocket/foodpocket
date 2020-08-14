import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'bootstrap'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'
import './bus'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)
Vue.use(VueCookies)
Vue.$cookies.config('1d')

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
