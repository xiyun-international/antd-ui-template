import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/login/index.vue';
import Layout from '@/views/layout/index.vue';
import children from './children';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    component: Login,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    children,
  },
];

const Router = new VueRouter({ routes });

Router.beforeEach((to, from, next) => {
  next();
});

export default Router;
