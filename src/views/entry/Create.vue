<template>
    <form 
    @submit.prevent="submitEntry"
    class="form-create-entry"
    >
        <h1>New Entry</h1>
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

        <div class="datepicker">
            <label for="">Date</label>
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
        

        <button type="submit">add</button>
    </form>
    <span v-if="errors" class="error">Please enter form data</span>
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
                DataService.saveItem('entries', this.entry)
                this.$store.dispatch('setFlashMessage', 'New entry : "' + this.entry.title + '" was added to list')
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