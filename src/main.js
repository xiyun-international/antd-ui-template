import Vue from 'vue';
import './plugins/ant-design-vue';
import '@xiyun/ant-design-ui/lib/index.css';
import XyUI from '@xiyun/ant-design-ui';

import App from './App.vue';
import router from './router';
import store from './store';
import { post, get } from './utils/http';

Vue.use(XyUI);

Vue.config.productionTip = false;

// 设置 http 请求方法
Vue.prototype.$post = post;
Vue.prototype.$get = get;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
