import Vue from 'vue'
import Vuex from 'vuex'
import settings from './settings'
//import idb from './indexeddb';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
  },
  state: {
    reportLayout: {},
  },
  mutations: {
  },
  actions: {

  },
  getters: {

  },
})
