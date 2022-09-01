import { createStore } from 'vuex'
import DataService from '@/services/DataService'
import moment from 'moment';

export default createStore({
  state: {
    categories: [],
    currencies: [],
    types: [],
    entries: [],
    flashMessage: ''
  },
  getters: {
  },
  mutations: { 
    SET_RESOURCE(state, payload) {
      //get only resource if it has filter params
      const resource = payload.resource.split("?");
      state[resource[0]] = payload.data
    },
    SET_FLASH_MESSAGE(state, message) {
      state['flashMessage'] = message

      setTimeout(() => {
        state['flashMessage'] = ''
      }, 4000)
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
      DataService.getItems(resource + '?_expand=category&_expand=type&_expand=currency&_sort=created_at&_order=asc')
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
    },
    setFlashMessage({ commit }, message) {
      commit('SET_FLASH_MESSAGE', message)
    }
  },
  modules: {
  }
})
