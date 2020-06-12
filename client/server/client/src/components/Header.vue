<template>
    <v-toolbar class="red" dark>
        <v-toolbar-title class="mr-4">
            <span
                class="home"
                @click="navigateTo({name: 'root'})">
                Protect ID
            </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn class="red" to="/register"
            v-if="!$store.state.isUserLoggedIn">
                Sign Up
            </v-btn>
            <v-btn class="red" to="/login"
            v-if="!$store.state.isUserLoggedIn">
                Log In
            </v-btn>
            <v-btn class="red" @click = "logout"
            v-if="$store.state.isUserLoggedIn">
                Log Out
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.home {
    cursor: pointer;
}

.home:hover {
    color: #000000;
}
</style>
