import Vue from 'vue';
import VueRouter from 'vue-router';
import GlobalMixin, { handleMixin } from '@/utils/global-mixin';

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

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  // 如果项目是简单 layout 时，那么需要向父页面发送 postMessage 来调整子页面 iframe 高度。
  // 正常业务请把这段代码删除掉
  if (process.env.VUE_APP_MODE === 'simple') {
    const components = router.getMatchedComponents(to);
    handleMixin(components, GlobalMixin);
  }
  next();
});

export default router;
