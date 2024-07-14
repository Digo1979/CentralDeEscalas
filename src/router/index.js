import { createRouter, createWebHistory } from "vue-router";
import AppLayout from '../layouts/AppLayout.vue';
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Calendario from "../views/Calendario.vue";
import Configuracao from "../views/Configuracao.vue";
import Privacidade from "../views/Privacidade.vue";
import TermoUso from "../views/TermoUso.vue";

const routes = [
  { 
    path: '/',
    component: AppLayout,
    children: [
      {
        path: "",
        component: Dashboard,
        meta: { requiresAuth: true },
      },      
      {
        path: "/dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "/calendario",
        component: Calendario,
        meta: { requiresAuth: true },
      },
      {
        path: "/configuracao",
        component: Configuracao,
        meta: { requiresAuth: true },
      },
      {
        path: "/privacidade",
        component: Privacidade,
        meta: { requiresAuth: false },
      },
      {
        path: "/termouso",
        component: TermoUso,
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  }  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("loggedIn");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
