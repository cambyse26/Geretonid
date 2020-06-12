<template>
  <v-card
    class="mx-auto"
    max-width="800"
    outlined
    color="orange"
  >
    <v-list-item three-line >
      <v-list-item-content>
        <div class="Title">Login</div>
        <v-list-item-title >
           <input type="email" name="email" v-model="email" placeholder="email">
        </v-list-item-title>
        <v-list-item-title >
          <input type="password" name="password" v-model="password" placeholder="password">
        </v-list-item-title>
        <v-list-item-title class="Error" v-html="error" />
      </v-list-item-content>
    </v-list-item>
    <v-card-actions class="buttonList">
      <v-btn class="purple" dark  @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

.Title {
  font-size: 30px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #ffffff;
}

.Error {
  font-size: 20px;
  color: red;
}

input {
  background-color: #ffffff;
  border: solid 2px #000000;
  border-radius: 15px;
  margin: 5px;
  padding: 5px;
  width: 80%;
  color: #000000;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
</style>
