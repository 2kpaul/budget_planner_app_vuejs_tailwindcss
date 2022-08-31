import { createStore } from 'vuex'
import DataService from '@/services/DataService'
import moment from 'moment';

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
      //get only resource if it has filter params
      const resource = payload.resource.split("?");
      state[resource[0]] = payload.data
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
    },
    fetchCurrentMonthResourceEntries({ commit }, resource) {
      DataService.getItems(resource)
        .then(response => {
          //console.log(response);
          const currentMonthData = response.filter( el => {
            const entryMonth = moment(el.created_at,'DD-MM-YYYY')
            const startOfCurrentMonth = moment().startOf('month').format('YYYY-MM-DD')
            const endOfCurrentMonth = moment().endOf('month').format('YYYY-MM-DD')
            
            return entryMonth.isBetween(startOfCurrentMonth, endOfCurrentMonth, 'days', '[]')
          })
          
          commit('SET_RESOURCE', {resource: resource, data: currentMonthData})
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
