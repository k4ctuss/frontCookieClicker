import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import GameView from '../views/GameView.vue'
import { useUserStore } from '../stores/user.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        if(!useUserStore().isLoggedIn) {
          next() // Take you to /something
        }else {
          // If params.blah is blank or in your case, does not have permission, redirect back to the home page
        next({ name: 'game' }) 
      }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      beforeEnter: (to, from, next) => {
        if(!useUserStore().isLoggedIn) {
          next() // Take you to /something
        }else {
            // If params.blah is blank or in your case, does not have permission, redirect back to the home page
          next({ name: 'game' }) 
        }
      }
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    }
  ]
})

export default router
