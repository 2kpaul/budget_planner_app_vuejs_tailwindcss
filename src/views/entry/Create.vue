<template>
    <form>
        <BaseInput
            v-model="entry.title"
            label="Title"
            type="text"
        />
        
        <BaseInput
            v-model="entry.description"
            label="Description"
            type="text"
        />

        <BaseInput
            v-model="entry.created_at"
            label="Date"
            type="text"
        />

        <BaseSelect
            :options="types"
            v-model="entry.type_id"
            label="Select type"
        />

        <BaseSelect
            :options="categories"
            v-model="entry.category_id"
            label="Select category"
        />

        <BaseSelect
            :options="currencies"
            v-model="entry.currency_id"
            label="Select currency"
        />

        <BaseInput
            v-model="entry.value"
            label="Value"
            type="text"
        />
    </form>
    {{ entry }}
</template>

<script>
import BaseInput from '@/components/form/BaseInput.vue'
import BaseSelect from '@/components/form/BaseSelect.vue'
export default {
    components: {
        BaseInput,
        BaseSelect
    },
    data() {
        return {
            entry: {
                title: '',
                description: '',
                created_at: '',
                type_id: '',
                category_id: '',
                currency_id: '',
                amount: ''
            },
        }
    },
    created() {
        this.$store.dispatch('fetchResourceItems', 'types')
        this.$store.dispatch('fetchResourceItems', 'currencies')
        this.$store.dispatch('fetchResourceItems', 'categories')
    },
    computed: {
        types() {
            return this.$store.state.types
        },
        currencies() {
            return this.$store.state.currencies
        },
        categories() {
            return this.$store.state.categories
        }
    },
    methods: {
    },
}
</script>