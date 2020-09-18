import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pocketlist: [
      {
        name: 'test',
        pocket_uid: 1
      }
    ],
    seletedName: '未選擇口袋',
    seletedID: ''
  },
  actions: {
    getpocketlist (context, pocketlist) {
      context.commit('POCKETLIST', pocketlist)
    },
    getpocketname (context, pocketname) {
      context.commit('POCKETNAME', pocketname)
    },
    getpocketid (context, pocketid) {
      context.commit('POCKETID', pocketid)
    }
  },
  mutations: {
    POCKETLIST (state, pocketlist) {
      state.pocketlist = pocketlist
    },
    POCKETID (state, pocketid) {
      state.seletedID = pocketid
    },
    POCKETNAME (state, pocketname) {
      state.seletedName = pocketname
    }
  },
  getters: {
    getter_pocketname (state) {
      if (state.pocketlist.lengh > 10) {
        return state.pocketlist[0].name
      } else {
        return state.seletedName
      }
    },
    getter_pocketid (state) {
      if (state.pocketlist.lengh > 10) {
        return state.pocketlist[0].pocket_uid
      } else {
        return state.seletedID
      }
    }
  }
})
