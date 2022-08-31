<template>
<div class="mb-6">
    <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="field"
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
            type: Boolean,

        }
    }
}
</script>