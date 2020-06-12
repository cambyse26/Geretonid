<template>

  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" style="margin-top: -75px">
  <div class="col-2" style=" padding-top: 75px"><a style="font-size:30px; color: white">  Protect ID</a>
  </div>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul style="margin-top: 70px" class="navbar-nav text-uppercase ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link js-scroll-trigger">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/fonctionalities" class="nav-link js-scroll-trigger">Fonctionnalités</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Action" class="nav-link js-scroll-trigger">Mes différents droits</router-link>
          </li>
           <li class="nav-item">
            <router-link to="/Sensibilisation" class="nav-link js-scroll-trigger">Sensibilisation</router-link>
          </li>

        <li class="nav-item">
            <router-link to="/us" class="nav-link js-scroll-trigger">Qui sommes-nous ?</router-link>
          </li>
        </ul>
      </div>
  </nav>

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
        name: 'Home'
      })
    }
  }
}
</script>
