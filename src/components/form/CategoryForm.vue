<template>
    <form @submit.prevent="submitForm" class="form-create-entry">
        <h1>{{ this.formEditState ? 'Edit Category' : 'Add Category' }}</h1>
        <BaseInput
            v-model="category.title"
            label="Title"
            type="text"
            required 
        />
        <button type="submit">submit</button>
    </form>
    <span v-if="errors" class="error">Please enter form data</span>
</template>

<script>
import BaseInput from '@/components/form/BaseInput.vue'
import DataService from '@/services/DataService'

export default {
    components: {
        BaseInput,
    },
    props: {
        category: {
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
            category: {
                title: ''
            },
            errors: false
        }
    },
    computed: {
        categories() {
            return this.$store.state.categories
        },
        category() {
            if(this.formEditState == true) {
                this.category = this.$store.state.category
                return this.$store.state.category
            }
            return this.category
        }
    },
    methods: {
        submitForm() {
            if(!this.validateForm(this.category)) {
                DataService.saveItem('categories', this.category)
                .then(response => {
                    if(this.formEditState) {
                        this.$store.dispatch('setFlashMessage', 'Category : "' + this.category.title + '" was edited')
                    } else {
                        this.$store.dispatch('setFlashMessage', 'New Category : "' + this.category.title + '" was added to list')
                    }
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