<template>
    <form 
    @submit.prevent="submitForm"
    class="form-create-entry"
    >
        <h1>{{ this.formEditState ? 'Edit Entry' : 'Add Entry' }}</h1>
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
            :options="budgets"
            v-model="entry.budgetId"
            label="Budget"
            required
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
        

        <button type="submit" >submit</button>
    </form>
    <span v-if="errors" class="error">Please enter form data</span>
</template>

<script>
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
    props: {
        entry: {
            type: Object,
            required: true
        },
        formEditState:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            entry: {
                title: '',
                description: '',
                created_at: '',
                budgetId: '',
                typeId: '',
                categoryId: '',
                value: ''
            },
            errors: false
        }
    },
    created() {
        this.$store.dispatch('fetchResourceItems', 'types')
        this.$store.dispatch('fetchResourceItems', 'categories')
        this.$store.dispatch('fetchResourceItems', 'budgets?_expand=currency')
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
        },
        budgets() {
            return this.$store.state.budgets
        }, 
        entry() {
            if(this.formEditState == true) {
                this.entry = this.$store.state.entry
                return this.$store.state.entry
            }
            return this.entry
        }
    },
    methods: {
        submitForm() {
            if(!this.validateForm(this.entry)) {
                if(this.formEditState) {
                    this.$store.dispatch('setFlashMessage', 'Entry : "' + this.entry.title + '" was edited')
                } else {
                    this.$store.dispatch('setFlashMessage', 'New entry : "' + this.entry.title + '" was added to list')
                }         
                DataService.saveItem('entries', this.entry)
                this.entry = {}
                this.$router.push({ name: 'home'})
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