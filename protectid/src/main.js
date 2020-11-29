// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../css/agency.css'
import '../scss/agency.scss'
import Vuetify from 'vuetify'
import '../fontawesome-free/css/all.min.css'
import '../bootstrap/css/bootstrap.min.css'
import '../bootstrap/js/bootstrap.bundle.min.js'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'

Vue.use(Vuetify)

Vue.config.productionTip = false

sync(store, router)

new Vue({// eslint-disable-line no-new

  el: '#app',
  vuetify: new Vuetify(),
  router,
  store,
  components: { App },
  template: '<App/>'
})
