<template>
<li class="container mx-auto py-3 sm:py-4">
  <div class="grid grid-cols-4 gap-3 place-items-center">
      <div class="grid place-items-center">
        <div :class="(entry.type.title === 'Income') ? 
        'text-white bg-green-600 font-bold rounded-full text-xs w-14 h-6 p-1 mb-3' : 
        'text-white bg-red-600 font-bold rounded-full text-xs w-16 h-6 p-1 mb-3' ">
          {{entry.type.title}}
        </div>
        <div class="text-white bg-cyan-600 font-bold rounded-full text-xs w-14 h-6 p-1">
          {{entry.category.title}}
        </div>
      </div>
      <div class="min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              {{entry.title}}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
              {{entry.description}}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
              
          </p>
      </div>
      <div :class="(entry.type.title === 'Income') ? 'text-green-600 inline-flex text-sm font-semibold text-gray-900 dark:text-white' 
      : 'text-red-600 inline-flex text-sm font-semibold text-gray-900 dark:text-white'">
          {{ entry.type.title === 'Income' ? '+' : '-' }}  {{ entry.value.toLocaleString("en-US") }} {{ entry.currency.title}}
      </div>
      <div class="text-sm text-gray-500 truncate dark:text-gray-400">
          {{entry.created_at}}
      </div>
  </div>
</li>
</template>

<script>
export default {
  name: 'Entry',
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
