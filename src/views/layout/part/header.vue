<template>
  <div class="header">
    <router-link class="logo" to="/">
      Logo
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
      this.$router.replace('/login');
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding-right: 40px;
  padding-left: 44px;
  color: #fefefe;
  .logo {
    display: flex;
    outline: none;
    color: white;
  }
  .right {
    font-size: 14px;
  }
}
</style>
