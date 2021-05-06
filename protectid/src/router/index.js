import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Fonctionalities from '@/components/Fonctionalities'
import Us from '@/components/Us'
import Sensibilisation from '@/components/Sensibilisation'
import Droit from '@/components/Droit'
import Mention from '@/components/Mention_legale'
import Blog from '@/components/Blog/Blog'
import FormBlog from '@/components/Admin/FormBlog'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import BP from '@/components/Bonne_pratique'
import FourOhFour from '@/components/FourOhFour'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
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
        },
        {
            path: '/mention_legale',
            name: 'Mention',
            component: Mention
        },
        {
            path: '/blog',
            name: 'Blog',
            component: Blog
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/admin/posts/new',
            name: 'FormBlog',
            component: FormBlog
        },
        {
            path: '/Bonne_pratique',
            name: 'BP',
            component: BP
        },
        {
            path: '/not-found',
            name: 'not-found',
            component: FourOhFour
        },
        {
            path: '/**',
            redirect: '/not-found'
        },
        // Ne pas écrire après ce commentaire !!!
    ]
})