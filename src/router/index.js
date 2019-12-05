import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import {isAuthenticatedMiddleware} from "../middlewares/isAuthenticatedMiddleware";
import configAuth from "../config/authentication";
import Vote from "../views/Vote";
import VoteProfil from "../views/VoteProfil";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next) => {
            isAuthenticatedMiddleware([configAuth.ROLE_ADMIN, configAuth.ROLE_USER], to, from, next)
        }
    },
    {
        path: '/users',
        name: 'users',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue'),
        beforeEnter: (to, from, next) => {
            isAuthenticatedMiddleware([configAuth.ROLE_ADMIN], to, from, next)
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/vote',
        name: 'vote',
        component: Vote,
        beforeEnter: (to, from, next) => {
            isAuthenticatedMiddleware([configAuth.ROLE_ADMIN, configAuth.ROLE_USER], to, from, next)
        }
    },
    {
        path: '/logout',
        name: 'logout',
        beforeEnter: (to, from, next) => {
            localStorage.removeItem("access_token");
            //localStorage.removeItem("token_data");
            next("/login")
        }
    },
    {
        path: '/votes/:uuid',
        name: 'vote_profile',
        component: VoteProfil,
        beforeEnter: (to, from, next) => {
            isAuthenticatedMiddleware([configAuth.ROLE_ADMIN, configAuth.ROLE_USER], to, from, next)
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


/*
router.beforeEach((to, from, next) => {
  if(!to.meta.isAuthorize && to.path !== '/login') {
    console.log("error ici");
    next('/login')
  } else {
    console.log("this path")
    next();
  }
});
*/

export default router
