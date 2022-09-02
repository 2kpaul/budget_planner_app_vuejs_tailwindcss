import { createStore } from 'vuex'
import DataService from '@/services/DataService'
import moment from 'moment';

export default createStore({
  state: {
    categories: [],
    types: [],
    entries: [],
    budgets: [],
    flashMessage: '',
    totalIncome: 0,
    totalExpenses: 0,
    totalSavings: 0,
    dataReady: false,
  },
  getters: {
  },
  mutations: { 
    SET_RESOURCE(state, payload) {
      //get only resource if it has filter params
      const resource = payload.resource.split("?");
      state[resource[0]] = payload.data
      state.dataReady = true
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
    fetchBudgetsWithMonthlyEntries({commit}) {

      const promises = []

      DataService.getItems('budgets?_expand=currency')
      .then(budgets => {
        if(budgets.length > 0) {
          budgets.forEach(budget => {
            promises.push(
              DataService.getItems('entries' + '?_expand=category&_expand=type&_expand=budget&_sort=created_at&_order=asc&budgetId=' + budget.id)
              .then(entries => {
                const currentMonthEntries = entries.filter( entry => {
                  const entryMonth = moment(entry.created_at,'DD-MM-YYYY')
                  const startOfCurrentMonth = moment().startOf('month').format('YYYY-MM-DD')
                  const endOfCurrentMonth = moment().endOf('month').format('YYYY-MM-DD')
                  
                  return entryMonth.isBetween(startOfCurrentMonth, endOfCurrentMonth, 'days', '[]')
                })
                
                budget.entries = currentMonthEntries
                

                let totalIncome = 0;
                let totalExpenses = 0;

                const incomes = currentMonthEntries.filter(entry => {
                  return parseInt(entry.typeId) === 1
                });
          
                const expenses = currentMonthEntries.filter(entry => {
                  return parseInt(entry.typeId) === 2
                });
                
                if(incomes.length > 0) {
                  incomes.forEach(entry => {
                    totalIncome += parseInt(entry.value)
                  });
                }
          
                if(expenses.length > 0) {
                  expenses.forEach(entry => {
                    totalExpenses += parseInt(entry.value)
                  });
                }

                budget.totalIncome = totalIncome
                budget.totalExpenses = totalExpenses
                budget.totalSavings = totalIncome - totalExpenses

                

              })
              .then(response => {
                
              })
              .catch(error => {
                console.log(error)
              })
            )
            
          })
          
        }
        return budgets
      })
      .then(budgets => {
        Promise.all(promises).then(() => {
          commit('SET_RESOURCE', {resource: 'budgets', data: budgets})
          this.state.dataReady = true
        });  
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
