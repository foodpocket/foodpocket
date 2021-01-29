import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  actions: {
  },
  mutations: {
    stopLoading(state) {
      state.isLoading = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
  },
  getters: {},
});
