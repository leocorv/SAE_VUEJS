import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoutiqueView from '../views/BoutiqueView.vue'
import AccountView from '../views/AccountView.vue'
import HelpView from '../views/AideView.vue'
import PanierView from '../views/PanierView.vue'


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
      component: AccountView
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
