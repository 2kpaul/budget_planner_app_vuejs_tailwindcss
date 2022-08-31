<template>
    <form @submit.prevent="submitEntry">
        <BaseInput
            v-model="entry.title"
            label="Title"
            type="text"
            required 
        />
        
        <BaseInput
            v-model="entry.description"
            label="Description"
            type="text"
        />

        <BaseSelect
            :options="types"
            v-model="entry.typeId"
            label="Select type"
            required
        />

        <BaseSelect
            :options="categories"
            v-model="entry.categoryId"
            label="Select category"
            required
        />

        <BaseSelect
            :options="currencies"
            v-model="entry.currencyId"
            label="Select currency"
            required
        />

        <BaseInput
            v-model="entry.value"
            label="Value"
            type="number"
            required
        />

        <Datepicker v-model="entry.created_at" 
            format='dd-MM-yyyy' 
            modelType="dd-MM-yyyy" 
            autoApply 
            showNowButton 
            :enableTimePicker="false"
            required></Datepicker>

        <button type="submit">submit</button>
    </form>
    <span v-if="errors" class="text-red-500">Please enter form data</span>
</template>

<script>
import axios from 'axios'
import BaseInput from '@/components/form/BaseInput.vue'
import BaseSelect from '@/components/form/BaseSelect.vue'
import Datepicker from '@vuepic/vue-datepicker';
import DataService from '@/services/DataService'

export default {
    components: {
        BaseInput,
        BaseSelect,
        Datepicker
    },
    data() {
        return {
            entry: {
                title: '',
                description: '',
                created_at: '',
                typeId: '',
                categoryId: '',
                currencyId: '',
                value: ''
            },
            errors: false
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
        submitEntry() {
            if(!this.validateForm(this.entry)) {
                console.log(this.entry)
                DataService.saveItem('entries', this.entry)
                this.entry = {}
            } 
        },

        validateForm(entry) {
            this.errors = false
            if(entry.title == '' || entry.value == '' || entry.created_at == '') {
                this.errors = true
                return true
            }

            return false
        }
    },
}
</script>