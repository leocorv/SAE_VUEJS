import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SellView from '../views/SellView.vue'
import SearchView from '../views/SearchView.vue'
import LocationView from '../views/LocationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sell',
      name: 'sell',
      component: SellView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/location',
      name: 'location',
      component: LocationView
    }
  ]
})

export default router
