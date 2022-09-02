<template>
<div v-if="this.$store.state.dataReady">
  <div class="alert-success" v-if="this.$store.state.flashMessage">{{ this.$store.state.flashMessage }}</div>
  <div v-for="budget in budgets" :key="budget.id" class="budgets">
    <div class="entries-card col-span-2">
      <div class="header">
        <h2>{{ budget.title }} for {{ currentMonth }} <span> - {{ budget.currency.title }} currency</span></h2>
        <router-link to="/entries/create">Add Entry</router-link>
      </div>
      <div>
      <ul role="list" class="entries">
          <Entry v-for="entry in budget.entries" :key="entry.id" :entry="entry" :currency="budget.currency.title"/> 
      </ul>
      </div>
    </div>

    <div class="stats-card">
      <div class="header">
        <h2>{{ budget.title }} statistics for {{ currentMonth }}</h2>
        <h3>{{ budget.currency.title }} currency</h3>
      </div>
      <ul role="list" class="stats-entries">
        <li>
          <div class="content-entry">
            <span>Total income</span>
            <span class="income-value">{{ budget.totalIncome.toLocaleString("en-US") }} {{ budget.currency.title }}</span>
          </div>
        </li>
        <li>
          <div class="content-entry">
            <span>Total Expenses</span>
            <span class="expenses-value">{{ budget.totalExpenses.toLocaleString("en-US") }} {{ budget.currency.title }}</span>
          </div>
        </li>
        <li>
          <div v-if="budget.totalSavings" class="content-entry">
            <span>Total Savings</span>
            <span class="savings-value">{{ budget.totalSavings.toLocaleString("en-US") }} {{ budget.currency.title }}</span>
          </div>
        </li>
      </ul>
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
