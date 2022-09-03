<template>
    <EntryForm :entry="entry"/>
</template>

<script>
import EntryForm from '@/components/form/EntryForm.vue'

export default {
    components: {
        EntryForm,
    },
    data() {
        return {
            entry: {}
        }
    },
}
</script>