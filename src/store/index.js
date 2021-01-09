import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import jwtUtils from '../utils'


export default new Vuex.Store({
  state: {
    currentJwt: null
  },
  mutations: {
    SET_JWT(state, jwt) {
      state.currentJwt = jwt;
    }
  },
  actions: {
  },
  getters: {
    currentJwt(state) {
      return state.currentJwt;
    },
    isAdmin(state) {
      return jwtUtils.getUserType(state.currentJwt)
    }
  },
  modules: {
  }
})
