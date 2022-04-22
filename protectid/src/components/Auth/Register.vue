<template>
  <section class="page-section">
    <div class="container">
      <h1 class="h3 text-center">Inscription</h1>
      <form action="#" @submit.prevent="register">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            v-model="password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Envoyer</button>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {},
  },
};
</script>