import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VueCookies from 'vue-cookies';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import './bus';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.use(VueCookies);
Vue.$cookies.config('30d');
Vue.use(Vuex);

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
