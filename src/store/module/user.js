import { post } from '@/utils/http';

export default {
  state: {
    userInfo: {},
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.userInfo = payload;
    },
    clearUser(state) {
      state.userInfo = {};
    },
  },
  actions: {
    fetchUser(context) {
      post('/user-info').then(res => {
        context.commit('setUser', res.data);
      });
    },
  },
};
