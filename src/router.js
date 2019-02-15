import Vue from 'vue'
import Router from 'vue-router'
import Connexion from './views/Connexion.vue'
import CreerCompte from './views/CreerCompte.vue'
import Membres from './views/Membres.vue'
import Membre from './views/Membre.vue'
import Discussions from './views/Discussions.vue'
import Discussion from './views/Discussion.vue'
import CreerDiscussion from './views/CreerDiscussion.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Connexion',
      component: Connexion
    },
    {
      path: '/CreerCompte',
      name: 'CreerCompte',
      component: CreerCompte
    },
    {
      path: '/Discussions',
      name: 'Discussions',
      component: Discussions
    },
    {
      path: '/Discussion/:id',
      name: 'Discussion',
      component: Discussion
    },
    {
      path: '/Membres',
      name: 'Membres',
      component: Membres
    },
    {
      path: '/Membre/:id',
      name: 'Membre',
      component: Membre
    },
    {
      path: '/CreerDiscussion',
      name: 'CreerDiscussion',
      component: CreerDiscussion
    },
//    {
//      path: '/about',
//      name: 'about',
//      // route level code-splitting
//      // this generates a separate chunk (about.[hash].js) for this route
//      // which is lazy-loaded when the route is visited.
//      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//    }
  ]
})
