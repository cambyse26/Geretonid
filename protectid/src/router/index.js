import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Fonctionalities from '@/components/Fonctionalities'
import Us from '@/components/Us'
import Sensibilisation from '@/components/Sensibilisation'
import Droit from '@/components/Droit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/fonctionalities',
      name: 'Fonctionalities',
      component: Fonctionalities
    },
    {
      path: '/us',
      name: 'Us',
      component: Us
    },
    {
      path: '/sensibilisation',
      name: 'Sensibilisation',
      component: Sensibilisation
    },
    {
      path: '/droit',
      name: 'Droit',
      component: Droit
    }
  ]
})
