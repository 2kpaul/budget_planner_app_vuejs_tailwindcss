<template>
    <form>
        <input type="text" v-model="entry.title" placeholder="title" />
        <textarea v-model="entry.description" cols="30" rows="10" placeholder="description"></textarea>
        <input type="text" v-model="created_at" placeholder="DD.MM.YYYY" />
        <select v-model="entry.type_id">
            <option value="">select type</option>
            <option v-for="type in types" :key="type.id" :value="type.id">{{ type.title }}</option>
        </select>
        <select v-model="entry.category_id">
            <option value="">select category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
        </select>
        <select v-model="entry.currency_id">
            <option value="">select currency</option>
            <option v-for="currency in currencies" :key="currency.id" :value="currency.id">{{ currency.title }}</option>
        </select>
        <input type="text" v-model="entry.value" placeholder="value">
    </form>
</template>

<script>

export default {
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