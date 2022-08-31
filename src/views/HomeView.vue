<template>
<div>
  <h1>Budget for {{ currentMonth }}</h1>
  <div class="entries">
    <Entry v-for="entry in entries" :key="entry.id" :entry="entry"/>
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
