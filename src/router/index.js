import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import {isAuthenticatedMiddleware} from "../middlewares/isAuthenticatedMiddleware";
import configAuth from "../config/authentication";

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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: (to, from, next) => {
      isAuthenticatedMiddleware([configAuth.ROLE_USER],to, from, next)
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_data");
      next("/login")
    }
  }
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
