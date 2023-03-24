import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoutiqueView from '../views/BoutiqueView.vue'
import AccountView from '../views/AccountView.vue'
import HelpView from '../views/AideView.vue'
import PanierView from '../views/PanierView.vue'
import ProfilView from '../views/ProfilView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/boutique',
      name: 'boutique',
      component: BoutiqueView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      beforeEnter: (to, from, next) => {
        if (isConnected) {
          next()
        } else {
          next('/profil')
        }
      }
    },
    {
      path: '/profil',
      name: 'Profil',
      component: ProfilView,
      beforeEnter: (to, from, next) => {
        if (!isConnected) {
          next()
        } else {
          next('/account')
        }
      }
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView
    },
    {
      path: '/panier',
      name: 'panier',
      component: PanierView
    }
  ]
})

export default router
