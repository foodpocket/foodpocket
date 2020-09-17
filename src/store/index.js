import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    pocketid: '',
    pocketname: '',
    pocketlist: []
  },
  actions: {
    gettoken (context, token) {
      context.commit('TOKEN', token)
    },
    getpocketid (context, pocketid) {
      context.commit('POCKETID', pocketid)
    },
    getpocketname (context, pocketname) {
      context.commit('POCKETNAME', pocketname)
    }
  },
  mutations: {
    TOKEN (state, token) {
      state.token = token
    },
    POCKETID (state, pocketid) {
      state.pocketid = pocketid
    },
    POCKETNAME (state, pocketname) {
      state.pocketname = pocketname
    },
    POCKETLIST (state, pocketlist) {
      state.pocketlist = pocketlist
    }
  }
})
