import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    successbus: {
      bg: '#008800cc',
      color: '#fff',
    },
    dangerbus: {
      bg: '#c40000cc',
      color: '#fff',
    },
    infobus: {
      bg: '#ffc107cc',
      color: '#000',
    },
  },
  actions: {
  },
  mutations: {
  },
  getters: {},
});
