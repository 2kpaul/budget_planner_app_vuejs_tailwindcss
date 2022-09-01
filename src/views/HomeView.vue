<template>
<div>
  <div class="entries-card">
    <div class="header">
      <h5>Budget for {{ currentMonth }}</h5>
      <router-link to="/entries/create">Add Entry</router-link>
    </div>
    <div>
    <ul role="list" class="entries">
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
    this.$store.dispatch(
      'fetchCurrentMonthResourceEntries', 
      'entries?_expand=category&_expand=type&_expand=currency&_sort=created_at&_order=asc'
    )
  },
  computed: {
    entries() {
      return this.$store.state.entries
    }
  },
}
</script>
