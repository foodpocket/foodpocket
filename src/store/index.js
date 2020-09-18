import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pocketid: '',
    pocketname: '',
    pocketlist: []
  },
  actions: {
    getpocketid (context, pocketid) {
      context.commit('POCKETID', pocketid)
    },
    getpocketname (context, pocketname) {
      context.commit('POCKETNAME', pocketname)
    }
  },
  mutations: {
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
