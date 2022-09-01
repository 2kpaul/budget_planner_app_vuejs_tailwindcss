<template>
<li>
  <div class="content-entry">
      <div :class="(entry.type.title === 'Income') ? 'type-income' : 'type-expenses'">
          {{entry.type.title}}
      </div>
      <div class="category">
          {{entry.category.title}}
      </div>
      <div class="title">
          <p>
              {{entry.title}}
          </p>
          <!-- <p>
              {{entry.description}}
          </p> --> 
      </div>
      <div :class="(entry.type.title === 'Income') ? 'income-value' : 'expenses-value'">
          {{ entry.type.title === 'Income' ? '+' : '-' }}  {{ entry.value.toLocaleString("en-US") }} {{ entry.currency.title}}
      </div>
      <div class="created-date">
          {{entry.created_at}}
      </div>
      <div class="actions">
        <button @click="deleteEntry(entry.id)">delete</button>
      </div>
  </div>
</li>
</template>

<script>
import DataService from '@/services/DataService'
export default {
  name: 'Entry',
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteEntry(id) {
      if(confirm('delete ' + '"'+ this.entry.title +'" ?')){
        DataService.deleteItem('entries', id)
        this.$store.dispatch(
          'fetchCurrentMonthResourceEntries', 
          'entries'
        )
      }
    }
  },
}
</script>
