<template>
<div class="mb-6 grid grid-cols-3 items-center">
  <label v-if="label" class="block mb-2 text-xs font-bold text-gray-900 dark:text-gray-300">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', $event.target.value)"
    class="block p-2 w-full col-span-2
    text-gray-900 bg-gray-50 rounded-lg border 
    border-gray-300 sm:text-xs focus:ring-green-500 
    focus:border-green-500 dark:bg-gray-700 dark:border-gray-600
    dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 
    dark:focus:border-green-500"
  >
</div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>