<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Entry/>
  </div>
</template>

<script>
// @ is an alias to /src
import Entry from '@/components/Entry.vue'

export default {
  name: 'HomeView',
  components: {
    Entry
  }
}
</script>
