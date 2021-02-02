import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        search: null,
        appTitle: process.env.VUE_APP_TITLE,
        tasks: [
            {
                id: 1,
                title: "Wake up",
                done: false,
                dueDate: "2020-02-02",
            },
            {
                id: 2,
                title: "Get bananas",
                done: false,
                dueDate: "2020-02-03",
            },
            {
                id: 3,
                title: "Eat bananas",
                done: false,
                dueDate: null,
            },
        ],
        snackbar: {
            show: false,
            text: "",
        },
    },
    mutations: {
        setSearch(state, value) {
            state.search = value
        },
        addTask(state, newTaskTitle) {
            state.tasks.push({
                id: state.tasks.length + 1,
                title: newTaskTitle,
                done: false,
                dueDate: null,
            })
        },
        doneTask(state, id) {
            let task = state.tasks.filter((task) => task.id === id)[0]
            task.done = !task.done
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter((task) => task.id !== id)
        },
        updateTaskTitle(state, payload) {
            let task = state.tasks.filter((task) => task.id === payload.id)[0]
            task.title = payload.title
        },
        updateTaskDueDate(state, payload) {
            let task = state.tasks.filter((task) => task.id === payload.id)[0]
            task.dueDate = payload.dueDate
        },
        showSnackbar(state, text) {
            let timeout = 0
            if (state.snackbar.show) {
                state.snackbar.show = false
                timeout === 500
            }
            setTimeout(() => {
                state.snackbar.show = true
                state.snackbar.text = text
            }, timeout)
        },
        hideSnackbar(state) {
            state.snackbar.show = false
        },
    },
    actions: {
        addTask({ commit }, newTaskTitle) {
            commit("addTask", newTaskTitle)
            commit("showSnackbar", "Task added")
        },
        deleteTask({ commit }, id) {
            commit("deleteTask", id)
            commit("showSnackbar", "Task deleted!")
        },
        updateTaskTitle({ commit }, payload) {
            commit("updateTaskTitle", payload)
            commit("showSnackbar", "Task Updated!")
        },
        updateTaskDueDate({ commit }, payload) {
            commit("updateTaskDueDate", payload)
            commit("showSnackbar", "Due Date Updated!")
        },
    },
    getters: {
        tasksFiltered(state) {
            if (!state.search) {
                return state.tasks
            }
            return state.tasks.filter((task) =>
                task.title.toLowerCase().includes(state.search.toLowerCase())
            )
        },
    },
})
