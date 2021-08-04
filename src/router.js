import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Registrar from './components/Registrar.vue'
import Forgot from './components/Forgot.vue'
import Reset from './components/Reset.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/registrar', component: Registrar },
        { path: '/esqueci', component: Forgot },
        { path: '/reset/:token', component: Reset }
    ]
})