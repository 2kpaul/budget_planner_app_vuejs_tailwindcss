<template>
<div>
  <div class="p-4 w-full mx-auto max-w-2xl bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Budget for {{ currentMonth }}</h5>
        <router-link to="/entries/create" class="text-sm font-medium text-green-600 hover:underline dark:text-green-500">Add Entry</router-link>
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <Entry v-for="entry in entries" :key="entry.id" :entry="entry"/> 
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
      currentMonth: moment().format('MMMM')
    }
    
  },
  created() {
    this.$store.dispatch('fetchCurrentMonthResourceEntries', 'entries?_expand=category&_expand=type&_expand=currency')
  },
  computed: {
    entries() {
      return this.$store.state.entries
    }
  },
}
</script>
