import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store.js'
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import HelpView from '../views/AideView.vue'
import PanierView from '../views/PanierView.vue'
import ProfilView from '../views/ProfilView.vue'
import CategorieView from '../views/CategorieView.vue'
import DetailProduitView from '../views/DetailProduitView.vue'
import InfoPaiement from '../views/InformationsPaiement.vue'
import Merci from '../views/Merci.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categorie/:idCategorie',
      name: 'categorie',
      component: CategorieView,
      props:true
    },
    {
      path: '/description/:idProduit',
      name: 'description',
      component: DetailProduitView,
      props:true
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      beforeEnter: (to, from, next) => {
        if (useAuthStore().isConnected == false) {
          // console.log(useAuthStore().isConnected);
          next()
        } else {
          next('/myaccount')
        }
      }
    },
    {
      path: '/myaccount',
      name: 'Profil',
      component: ProfilView,
      beforeEnter: (to, from, next) => {
        if (useAuthStore().isConnected == true) {
          // console.log(useAuthStore().isConnected)
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
      component: PanierView,
    },
    {
      path: '/infosPaiement',
      name: 'infosPaiement',
      component: InfoPaiement,
      beforeEnter: (to, from, next) => {
        if (useAuthStore().isConnected == true) {
          next()
        } else {
          next('/panier')
        }
      }
    },
    {
      path: '/merci',
      name: 'merci',
      component: Merci
    }
  ]
})

export default router
