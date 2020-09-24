// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../css/agency.css'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/fontawesome-free/css/all.min.css'
import '../scss/agency.scss'
import '../vendor/jquery/jquery.min.js'
import '../vendor/bootstrap/js/bootstrap.bundle.min.js'
import '../vendor/jquery-easing/jquery.easing.min.js'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
Vue.use(Vuetify)

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  router,
  store,
  components: { App },
  template: '<App/>'
})
