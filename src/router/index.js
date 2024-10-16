import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue' // Importa el componente de Login

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login', // Cambia el nombre a 'login'
      component: Login // Cambia el componente a Login
    },
    {
      path: '/main',
      name: 'main',
      component: HomeView // Ruta para la página principal
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/tarjetas',
      name: 'cards',
      component: () => import('../components/mainCardPage/cardPage.vue')
    },
    {
      path: '/nueva-tarjeta',
      name: 'newCard',
      component: () => import('../components/mainCardPage/NewCardPage.vue')
    },
    {
      path: '/panel',
      name: 'panel',
      component: () => import('../components/panelPage/HomePage.vue')
    },
    {
      path: '/transferencia',
      name: 'transferencia',
      component: () => import('../components/transferPage/transferPage.vue')
    }
  ]
})

export default router
