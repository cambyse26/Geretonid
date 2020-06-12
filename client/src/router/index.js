import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Download from '@/components/Download'
import Fonctionalities from '@/components/Fonctionalities'
import Us from '@/components/Us'
import Sensibilisation from '@/components/Sensibilisation'
import Action from '@/components/Action'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/download',
      name: 'Download',
      component: Download
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
      path: '/action',
      name: 'Action',
      component: Action
    }
  ]
})
