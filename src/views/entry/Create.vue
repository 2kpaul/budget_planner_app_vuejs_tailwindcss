<template>
    <form 
    @submit.prevent="submitEntry"
    class="p-4 w-full mx-auto max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
        <h1 class="text-xl font-bold mb-4">New Entry</h1>
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
            label="Type"
            required
        />

        <BaseSelect
            :options="categories"
            v-model="entry.categoryId"
            label="Category"
            required
        />

        <BaseSelect
            :options="currencies"
            v-model="entry.currencyId"
            label="Currency"
            required
        />

        <BaseInput
            v-model="entry.value"
            label="Value"
            type="number"
            required
        />

        <div class="grid grid-cols-3 mb-6 items-center">
            <label for="" class="block mb-2 text-xs font-bold text-gray-900 dark:text-gray-300">Date</label>
            <Datepicker v-model="entry.created_at" 
            format='dd-MM-yyyy' 
            modelType="dd-MM-yyyy" 
            autoApply 
            showNowButton 
            :enableTimePicker="false"
            required
            class="col-span-2"
            ></Datepicker>
        </div>
        

        <button 
        type="submit"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 
        focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
        dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
        add
        </button>
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