<template>
<div v-if="this.$store.state.dataReady">
  <div class="alert-success" v-if="this.$store.state.flashMessage">{{ this.$store.state.flashMessage }}</div>
  <div v-for="budget in budgets" :key="budget.id" class="budgets">
    <div class="entries-card">
      <div class="header">
        <h6 class="text-lg font-bold dark:text-white">{{ budget.title }} for {{ currentMonth }} - <span class="badge-yellow-sm">{{ budget.currency.title }} currency</span></h6>
        <router-link to="/entries/create">Add Entry</router-link>
      </div>
      <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700">
      <div>
      <ul role="list" class="entries">
          <Entry v-for="entry in budget.entries" :key="entry.id" :entry="entry" :currency="budget.currency.title"/> 
      </ul>
      <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700">
      <div class="footer">
        <span class="badge-green-lg">Total Income: {{ budget.totalIncome.toLocaleString("en-US") }} {{ budget.currency.title }}</span>
        <span class="badge-red-lg">Total Expenses: {{ budget.totalExpenses.toLocaleString("en-US") }} {{ budget.currency.title }}</span>
        <span class="badge-indigo-lg">Total Savings: {{ budget.totalSavings.toLocaleString("en-US") }} {{ budget.currency.title }}</span>
      </div>
      </div>
    </div> 
  </div>

  

</div>
</template>

<script>
// @ is an alias to /src
import Entry from '@/components/Entry.vue'
import moment from 'moment'

export default {
  name: 'HomeView',
  components: {
    Entry
  },
  data() {
    return {
      currentMonth: moment().format('MMMM'),
    } 
  },
  created(){
    this.$store.state.dataReady = false
    this.$store.dispatch('fetchBudgetsWithMonthlyEntries')
  },
  computed: {
    budgets() {
      return this.$store.state.budgets
    }
  },
}
</script>
