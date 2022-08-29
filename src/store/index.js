import { createStore } from 'vuex'
import DataService from '@/services/DataService'

export default createStore({
  state: {
    categories: [],
    currencies: [],
    types: [],
    entries: [],
  },
  getters: {
  },
  mutations: { 
    SET_RESOURCE(state, payload) {
      state[payload.resource] = payload.data
    }
  },
  actions: {
    fetchResourceItems({ commit }, resource) {
      DataService.getItems(resource)
        .then(response => {
          commit('SET_RESOURCE', {resource: resource, data: response})
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchResourceItem({ commit }, resource) {
      DataService.getItems(resource)
        .then(response => {
          commit('SET_RESOURCE', {resource: resource, data: response})
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
