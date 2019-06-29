import Vue from 'vue';
import './plugins/ant-design-vue';
import './assets/global.less';

import App from './App.vue';
import router from './router';
import store from './store';
import { post, get } from './utils/http';

Vue.config.productionTip = false;

// 设置 http 请求方法
Vue.prototype.$post = post;
Vue.prototype.$get = get;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
