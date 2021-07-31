import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/pages/login'
import MainLayout from '@/layouts/Main'

/**
 *
 * Rotas do sistema
 *
 */
Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: MainLayout,
      meta: {
        authRequired: true,
        hidden: true,
      },
      title: 'SaaSCom',
      children: [
        {
          path: '/home',
          meta: {
            title: 'Empresas',
          },
          component: () => import('./views/pages/home'),
        },
        {
          path: '/detalhes',
          meta: {
            title: 'Empresas',
          },
          component: () => import('./components/SaastecComponents/DetalhesLoja'),
        },
        {
          path: '/404',
          meta: {
            title: '404',
          },
          component: () => import('./views/404'),
        },
      ],
    },

    // System Pages
    {
      id: 'login-page',
      path: '/user/login',
      component: Login,
    },
    {
      path: '*', redirect: '/404', hidden: true,
    },
  ],
})

export default router
