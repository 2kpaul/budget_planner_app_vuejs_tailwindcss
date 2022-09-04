<template>
    <form @submit.prevent="submitForm" class="form-create-entry">
        <h1>{{ this.formEditState ? 'Edit Budget' : 'Add Budget' }}</h1>
        <BaseInput
            v-model="budget.title"
            label="Title"
            type="text"
            required 
        />

        <BaseSelect
            :options="currencies"
            v-model="budget.currencyId"
            label="Currency"
            required
        />
        <button type="submit">submit</button>
    </form>
    <span v-if="errors" class="error">Please enter form data</span>
</template>

<script>
import BaseInput from '@/components/form/BaseInput.vue'
import BaseSelect from '@/components/form/BaseSelect.vue'
import DataService from '@/services/DataService'

export default {
    components: {
        BaseInput,
        BaseSelect,
    },
    props: {
        budget: {
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
            budget: {
                title: '',
                currencyId: '',
            },
            errors: false
        }
    },
    created() {
        this.$store.dispatch('fetchResourceItems', 'currencies')
    },
    computed: {
        currencies() {
            return this.$store.state.currencies
        },
        budget() {
            if(this.formEditState == true) {
                this.budget = this.$store.state.budget
                return this.$store.state.budget
            }
            return this.budget
        }
    },
    methods: {
        submitForm() {
            if(!this.validateForm(this.budget)) {

                if(this.formEditState) {
                    this.$store.dispatch('setFlashMessage', 'Budget : "' + this.budget.title + '" was edited')
                } else {
                    this.$store.dispatch('setFlashMessage', 'New budget : "' + this.budget.title + '" was added to list')
                }
                DataService.saveItem('budgets', this.budget)
                .then(response => {
                    
                    this.$store.dispatch('fetchResourceItems', 'budgets?_expand=currency')
                    this.budget = {}
                })
                .catch(error => {
                    console.log(error)
                })
                
            } 
        },

        validateForm(budget) {
            this.errors = false
            if(budget.title == '' || budget.currencyId == '') {
                this.errors = true
                return true
            }

            return false
        }
    }
}
</script>