import { post } from '@/utils/http';

export default {
  state: {
    menuData: [],
    iframe: {},
  },
  getters: {},
  mutations: {
    setMenu(state, payload) {
      state.menuData = payload;
    },
    clearMenu(state) {
      state.menuData = [];
      state.iframe = {};
    },
    setIframe(state, payload) {
      state.iframe = payload;
    },
  },
  actions: {
    fetchMenu(context) {
      post('/menus').then(res => {
        context.commit('setMenu', res.data);
      });
    },
  },
};
