<template>
  <div class="entries">
    <Entry v-for="entry in entries" :key="entry.id" :entry="entry"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Entry from '@/components/Entry.vue'

export default {
  name: 'HomeView',
  components: {
    Entry
  },
  created() {
    this.$store.dispatch('fetchResourceItems', 'entries')
  },
  computed: {
    entries() {
      return this.$store.state.entries
    }
  },
}
</script>
