<template>
    <div v-if="this.$store.state.dataReady">
        <div class="alert-success" v-if="this.$store.state.flashMessage">{{ this.$store.state.flashMessage }}</div>
        <div class="budgets-listing">
            <div>
                <form @submit.prevent="submitForm" class="form-create-entry">
                    <h1>New Category</h1>
                    <BaseInput
                        v-model="category.title"
                        label="Title"
                        type="text"
                        required 
                    />
                    <button type="submit">add</button>
                </form>
                <span v-if="errors" class="error">Please enter form data</span>
            </div>
            <div class="entries-budgets">
                <div class="header">
                    <h2>Categories List</h2>
                </div>
                <ul role="list" class="entries">
                    <li class="text-sm font-bold" v-for="entry in categories" :key="entry.id">{{ entry.title }}</li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>
import BaseInput from '@/components/form/BaseInput.vue'
import DataService from '@/services/DataService'

export default {
    components: {
        BaseInput,
    },
    data() {
        return {
            category: {
                title: ''
            },
            errors: false
        }
    },
    created(){
        this.$store.state.dataReady = false
        this.$store.dispatch('fetchResourceItems', 'categories')
    },
    computed: {
        categories() {
            return this.$store.state.categories
        }
    },
    methods: {
        submitForm() {
            if(!this.validateForm(this.category)) {
                DataService.saveItem('categories', this.category)
                .then(response => {
                    this.$store.dispatch('setFlashMessage', 'New category : "' + this.category.title + '" was added to list')
                    this.$store.dispatch('fetchResourceItems', 'categories')
                    this.category = {}
                })
                .catch(error => {
                    console.log(error)
                })
                
            } 
        },

        validateForm(budget) {
            this.errors = false
            if(budget.title == '') {
                this.errors = true
                return true
            }

            return false
        }
    }
}
</script>