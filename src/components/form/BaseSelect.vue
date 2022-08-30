<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <select
            v-bind="{
                ...$attrs,
                onChange: ($event) => {$emit('update:modelValue', $event.target.value)}
                }"
            :value="modelValue"
            class="field"
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