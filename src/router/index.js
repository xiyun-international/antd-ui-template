import Vue from 'vue';
import VueRouter from 'vue-router';
import GlobalMixin from '@/utils/global-mixin';

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
  // 如果项目是简单 layout 时，那么需要向父页面发送 postMessage 来调整子页面 iframe 高度。
  if (process.env.VUE_APP_MODE === 'simple') {
    const components = Router.getMatchedComponents(to);
    if (components.length === 1) {
      if (!components[0].mixins) {
        components[0].mixins = [];
      }
      components[0].mixins.push(GlobalMixin);
    } else {
      if (!components[components.length - 1].mixins) {
        components[components.length - 1].mixins = [];
      }
      components[components.length - 1].mixins.push(GlobalMixin);
    }
  }

  next();
});

export default Router;
