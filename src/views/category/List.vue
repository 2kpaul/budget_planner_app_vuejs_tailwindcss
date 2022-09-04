<template>
    <div v-if="this.$store.state.dataReady">
        <div class="alert-success" v-if="this.$store.state.flashMessage">{{ this.$store.state.flashMessage }}</div>
        <div class="budgets-listing">
            <div>
                <CategoryForm :category="category" :formEditState="formEditState" />
            </div>
            <div class="entries-budgets">
                <ul role="list" class="entries">
                    <li v-for="entry in categories" :key="entry.id">
                        <span class="badge-indigo-lg">
                            <a :href="'/categories/' + entry.id">
                                {{ entry.title }}
                            </a>
                        </span>
                        
                    </li>
                </ul>
                
            </div>
        </div>
        
    </div>
</template>

<script>
import CategoryForm from '@/components/form/CategoryForm.vue'

export default {
    components: {
        CategoryForm
    },
    props: ['id'],
    data() {
        return {
            category: {},
            formEditState: false
        }
    },
    created(){
        if(this.id) {
            this.$store.dispatch('fetchResourceItem', {resource: 'categories', resource_item: 'category', id: this.id})
            this.formEditState = true
        }
        this.$store.state.dataReady = false
        this.$store.dispatch('fetchResourceItems', 'categories')
    },
    computed: {
        categories() {
            return this.$store.state.categories
        },
        category() {
            return this.$store.state.budget
        }
    }
}
</script>