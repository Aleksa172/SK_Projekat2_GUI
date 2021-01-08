import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    }
  },
  modules: {
  }
})
