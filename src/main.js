import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'
import './bus'
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)
Vue.use(VueCookies)
Vue.$cookies.config('1d')
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
