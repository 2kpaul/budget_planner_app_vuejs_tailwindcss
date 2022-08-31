<template>
<div class="mb-6">
    <input
        type="radio"
        :checked="modelValue === value"
        :value="value"
        v-bind="$attrs"
        @change="$emit('update:modelValue', value)"
        />
    <label v-if="label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }}</label>
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
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>