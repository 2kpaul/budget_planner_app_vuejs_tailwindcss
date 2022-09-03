<template>
    <EntryForm v-if="this.$store.state.dataReady" :entry="entry" :formEditState="true"/>
</template>

<script>
import EntryForm from '@/components/form/EntryForm.vue'

export default {
    components: {
        EntryForm,
    },
    props: ['id'],
    data() {
        return {
            entry: {}
        }
    },
    created() {
        this.$store.dispatch('fetchResourceItem', {resource: 'entries', resource_item: 'entry', id: this.id})
    },
    entry() {
        return this.$store.state.entry
    }
}
</script>