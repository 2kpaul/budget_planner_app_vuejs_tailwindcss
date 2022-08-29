<template>
  <div>
    <span>{{entry.title}}</span> 
    <span>{{entry.description}}</span> 
    <span>{{entry.created_at}}</span>
    <span>{{entry.value}}</span>
  </div>
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
