import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Calendario from "../views/Calendario.vue";
import Configuracao from "../views/Configuracao.vue";
import Privacidade from "../views/Privacidade.vue";
import TermoUso from "../views/TermoUso.vue";
import ErrorNotFound from "../views/ErrorNotFound.vue";
import Error500 from "../views/Error500.vue";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Default",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "/calendario",
        name: "Calendario",
        component: Calendario,
        meta: { requiresAuth: true },
      },
      {
        path: "/configuracao",
        name: "Configuracao",
        component: Configuracao,
        meta: { requiresAuth: true },
      },
      {
        path: "/privacidade",
        name: "Privacidade",
        component: Privacidade,
        meta: { requiresAuth: false },
      },
      {
        path: "/termouso",
        name: "TermoUso",
        component: TermoUso,
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:catchAll(.*)*",
    name: "ErrorNotFound",
    component: ErrorNotFound,
    meta: { requiresAuth: false },
  },
  {
    path: "/error500",
    name: "Error500",
    component: Error500,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve(async (to, from, next) => {
  console.log("to.path", to.path);

  if (!localStorage.getItem("loggedIn") && to.path !== "/login") {
    console.log("/login");
    next("/login");
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      console.log("next");
      next();
    } else {
      console.log("/login");
      next();
    }
  }
});

// router.beforeEach(async (to, from, next) => {
//   console.log('beforeEach', to, from);

//   if (to.name !== 'Login' && !localStorage.getItem('loggedIn')) {
//     console.log('beforeEach.logado');
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       console.log('beforeEach.logado./');
//       next("/");
//     } else {
//       console.log('beforeEach.logado.next');
//       next();
//     }
//   } else {
//     console.log('beforeEach.logado/login');
//     next({ name: 'Login' })
//   }
// });

export default router;
