<template>
  <div>
    <navbar/>
    <router-view/>
    <foot/>
  </div>
</template>

<script type="text/javascript">
import navbar from './components/Navigation.vue'
import foot from './components/Footer.vue'

export default{
  name: 'App',

  components: {
    navbar,
    foot
  }
}
</script>

<style>
</style>
