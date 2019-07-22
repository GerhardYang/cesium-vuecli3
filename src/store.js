import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewer: null
  },
  getters: {
    getViewer: (state) => {
      return state.viewer
    }
  },
  mutations: {
    changeViewer: (state, viewer) => {
      // 变更状态
      state.viewer = viewer
    }
  },
  actions: {

  }
})
