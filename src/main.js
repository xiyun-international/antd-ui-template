import Vue from 'vue';
import { message } from 'ant-design-vue';
import './plugins/ant-design-vue';
import './assets/global.less';

import App from './App.vue';
import router from './router';
import store from './store';
import post from './utils/post';

Vue.config.productionTip = false;

Vue.prototype.$post = post;
Vue.prototype.$message = message;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
