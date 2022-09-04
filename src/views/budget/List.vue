<template>
    <div v-if="this.$store.state.dataReady">
        <div class="alert-success" v-if="this.$store.state.flashMessage" role="alert">
            <span class="font-medium">{{ this.$store.state.flashMessage }}</span>
        </div>
        <div class="budgets-listing">
            <div>
                <BudgetForm :budget="budget" :formEditState="formEditState"/>
            </div>
            <div class="entries-budgets">
                <ul role="list" class="entries">
                    <li v-for="entry in budgets" :key="entry.id">
                        <span class="badge-indigo-lg">
                            <a :href="'/budgets/' + entry.id">
                                {{ entry.title }} - {{entry.currency.title}}
                            </a>
                        </span>
                        
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>
import BudgetForm from '@/components/form/BudgetForm.vue'

export default {
    components: {
        BudgetForm
    },
    props: ['id'],
    data() {
        return {
            budget: {},
            formEditState: false
        }
    },
    created(){
        this.$store.state.dataReady = false
        if(this.id) {
            this.$store.dispatch('fetchResourceItem', {resource: 'budgets', resource_item: 'budget', id: this.id})
            this.formEditState = true
        }
        this.$store.dispatch('fetchResourceItems', 'budgets?_expand=currency')
    },
    computed: {
        budgets() {
            return this.$store.state.budgets
        },
        budget() {
            return this.$store.state.budget
        }
    }
}
</script>