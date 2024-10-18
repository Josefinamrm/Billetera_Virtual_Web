import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import GuestLayout from '../layouts/GuestLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GuestLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../components/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../components/Register.vue')
        }
      ]
    },
    {
      path: '/user',
      component: AuthLayout,
      children: [
        {
          path: 'tarjetas',
          name: 'cards',
          component: () => import('../components/cardPage/mainCardPage.vue')
        },
        {
          path: 'nueva-tarjeta',
          name: 'newCard',
          component: () => import('../components/cardPage/NewCardPage.vue')
        },
        {
          path: 'panel',
          name: 'panel',
          component: () => import('../components/panelPage/HomePage.vue')
        },
        {
          path: 'transferencia',
          name: 'transferencia',
          component: () => import('../components/transferPage/transferPage.vue')
        },
        {
          path: 'inversiones',
          name: 'inversiones',
        }
      ]
    }
  ]
})

export default router
