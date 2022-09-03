<template>
    <div v-if="this.$store.state.dataReady">
        <div class="alert-success" v-if="this.$store.state.flashMessage" role="alert">
            <span class="font-medium">{{ this.$store.state.flashMessage }}</span>
        </div>
        <div class="budgets-listing">
            <div>
                <form @submit.prevent="submitForm" class="form-create-entry">
                    <h1>New Budget</h1>
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
                    <button type="submit">add</button>
                </form>
                <span v-if="errors" class="error">Please enter form data</span>
            </div>
            <div class="entries-budgets">
                <div class="header">
                    <h2>Budgets List</h2>
                </div>
                <ul role="list" class="entries">
                    <li v-for="entry in budgets" :key="entry.id">
                        <span class="badge-indigo-lg">
                            {{ entry.title }} - {{entry.currency.title}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>
import BaseInput from '@/components/form/BaseInput.vue'
import BaseSelect from '@/components/form/BaseSelect.vue'
import DataService from '@/services/DataService'

export default {
    components: {
        BaseInput,
        BaseSelect
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
    created(){
        this.$store.state.dataReady = false
        this.$store.dispatch('fetchResourceItems', 'budgets?_expand=currency')
        this.$store.dispatch('fetchResourceItems', 'currencies')
    },
    computed: {
        budgets() {
            return this.$store.state.budgets
        },
        currencies() {
            return this.$store.state.currencies
        }
    },
    methods: {
        submitForm() {
            if(!this.validateForm(this.budget)) {
                DataService.saveItem('budgets', this.budget)
                .then(response => {
                    this.$store.dispatch('setFlashMessage', 'New budget : "' + this.budget.title + '" was added to list')
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