import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import LoginPage from '../components/LoginPage.vue';
import ProfilePage from '../components/ProfilePage.vue';
import UsersPage from '../components/UsersPage.vue';
import UserEdit from '../components/UserEdit.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/profile',
      component: ProfilePage
    },
    {
      path: '/users',
      component: UsersPage
    },
    {
      path: '/user/:userId',
      name: 'user',
      // lazy-loaded
      component: UserEdit
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
