<template>
    <div class="mb-6 grid grid-cols-3 items-center">
        <label v-if="label" class="block mb-2 text-xs font-bold font-medium text-gray-900 dark:text-gray-400">{{ label }}</label>
        <select
            v-bind="{
                ...$attrs,
                onChange: ($event) => {$emit('update:modelValue', $event.target.value)}
                }"
            :value="modelValue"
            class="block p-2 w-full col-span-2
            text-gray-900 bg-gray-50 rounded-lg border 
            border-gray-300 sm:text-xs focus:ring-green-500 
            focus:border-green-500 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 
            dark:focus:border-green-500"
        >
            <option 
                v-for="option in options" 
                :key="option.id" 
                :value="option.id"
                :selected="option === modelValue"
            >{{ option.title }}
            </option>
        </select>
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
        options: {
            type: Array,
            required: true
        }
    }
}
</script>