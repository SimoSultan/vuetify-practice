<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">
            <v-img
                class="pa-4 pt-6"
                height="160"
                src="mountains.jpg"
                gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
            >
                <v-avatar size="70" class="mb-2">
                    <img
                        src="https://secure.gravatar.com/avatar/dd8bac420d43faac7d3006a195c1dec3"
                        alt="Simon"
                    />
                </v-avatar>

                <div class="white--text text-subtitle-1 font-weight-bold">
                    Simon
                </div>
                <div class="white--text text-subtitle-2">
                    simo_sultan
                </div>
            </v-img>

            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                    link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="primary"
            dark
            prominent
            height="230"
            src="mountains.jpg"
        >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
                ></v-img>
            </template>

            <v-container class="header-container pa-0 mt-2">
                <v-row>
                    <v-app-bar-nav-icon
                        @click="drawer = !drawer"
                    ></v-app-bar-nav-icon>
                    <v-spacer></v-spacer>
                    <search />
                </v-row>
                <v-row>
                    <v-app-bar-title class="ml-4 text-h4 app-title">
                        {{ $store.state.appTitle }}
                    </v-app-bar-title>
                </v-row>
                <v-row>
                    <live-date-time />
                </v-row>
                <v-row>
                    <field-add-task />
                </v-row>
            </v-container>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
            <snackbar />
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        items: [
            { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
            { title: "About", icon: "mdi-help-box", to: "/about" },
        ],
        right: null,
    }),
    mounted() {
        this.$store.dispatch("getTasks")
    },
    components: {
        search: require("@/components/tools/Search.vue").default,
        snackbar: require("@/components/shared/Snackbar.vue").default,
        "live-date-time": require("@/components/tools/LiveDateTime.vue")
            .default,
        "field-add-task": require("@/components/Todo/FieldAddTask.vue").default,
    },
}
</script>

<style lang="sass">
.app-title
    width: 100%
.header-container
    max-width: none !important
</style>
