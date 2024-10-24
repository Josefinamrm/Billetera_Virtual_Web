import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import AuthLayout from '../layouts/AuthLayout.vue'
import GuestLayout from '../layouts/GuestLayout.vue'
import LandingLayout from '@/layouts/LandingLayout.vue'

// Initialize Pinia
const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GuestLayout,
      children: [
        {
          path: '',
          component: LandingLayout,
          children: [
            {
              path: '',
              name: 'landing',
              component: () => import('../components/LandingPage.vue')
            },
            {
              path: 'login',
              name: 'login',
              component: () => import('../components/Login.vue')
            },
            {
              path: 'register',
              name: 'register',
              component: () => import('../components/Register.vue')
            }
          ]
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
          component: () => import('../components/creditcard/CreditCardManagment.vue')
        },
        {
          path: 'nueva-tarjeta',
          name: 'newCard',
          component: () => import('../components/creditcard/CreditCardForm.vue')
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
          component: () => import('../components/investmentsPage/mainInvestmentsPage.vue')
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: () => import('../components/profilePage/mainProfilePage.vue')
        },
        {
          path: 'seguridad',
          name: 'seguridad',
          component: () => import('../components/profilePage/securityPage.vue')
        },
        {
          path: 'datos-de-tu-cuenta',
          name: 'datos-de-tu-cuenta',
          component: () => import('../components/profilePage/userData.vue')
        },
        {
          path: 'información-personal',
          name: 'información-personal',
          component: () => import('../components/profilePage/personalInfo.vue')
        }
      ]
    }
  ]
})

export default router
