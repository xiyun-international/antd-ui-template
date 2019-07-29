<template>
  <div class="header">
    <router-link class="logo" to="/">
      <img src="https://xr.xiyunerp.com/xy-logo.png" class="t-MT6" width="149" height="38" />
    </router-link>
    <div class="right">
      <a-dropdown>
        <div><a-icon type="team" /> 欢迎，{{ userInfo.userName }}</div>
        <a-menu slot="overlay">
          <a-menu-item @click="logout"> <a-icon type="logout" /> 退出登录 </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { removeToken } from '@xiyun/utils';

export default {
  name: 'header-nav',
  computed: mapState({
    userInfo: state => state.user.userInfo,
  }),
  methods: {
    logout() {
      removeToken();
      this.$store.commit('clearUser');
      this.$store.commit('clearMenu');
      this.$router.replace('/login');
    },
  },
};
</script>
