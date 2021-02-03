<template>
    <v-text-field
        v-model="newTaskTitle"
        class="pa-3 field-add-task"
        @keyup.enter="addTask()"
        outlined
        placeholder="Add Task"
        aria-placeholder="Add Task"
        hide-details
        clearable
    >
        <template v-slot:append>
            <v-icon @click="addTask()" :disabled="newTaskTitleInvalid">
                mdi-plus
            </v-icon>
        </template>
    </v-text-field>
</template>

<script>
export default {
    data() {
        return {
            newTaskTitle: "",
        }
    },
    computed: {
        newTaskTitleInvalid() {
            return !this.newTaskTitle
        },
    },
    methods: {
        addTask() {
            if (!this.newTaskTitleInvalid) {
                this.$store.dispatch("addTask", this.newTaskTitle)
                this.newTaskTitle = ""
            }
        },
    },
}
</script>

<style lang="sass">
.field-add-task.v-input--is-focused
    .v-input__slot
        background: rgba(31,94,129, 0.8) !important
</style>
