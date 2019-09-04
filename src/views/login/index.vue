<!-- @file 登录页 -->
<template>
  <div class="login-page">
    <login
      :apiConfig="apiConfig"
      :redirectPathAfterLogin="redirectPathAfterLogin"
      :animationConfig="animationConfig"
      :hideForgetPassowrd="true"
    >
      <img src="/xy_logo.png" width="149" height="38" />
      <a-col class="header-left" slot="header-left" :span="2" align="left">
        <!-- 禧鹊HOME -->
        <img src="/xy_logo.png" width="149" height="38" />
      </a-col>
    </login>
  </div>
</template>

<script>
import { get } from '@/utils/http';
import Login from './_login/index.vue';

export default {
  components: {
    login: Login,
  },

  data() {
    return {
      animationConfig: {},
      redirectPathAfterLogin: '/index',
    };
  },

  computed: {
    apiConfig() {
      return {
        login: '/login',
        getCode: 'api',
        verifyCode: '/api/v1/verification/checkVerCodeForPwd',
        updatePassword: '/api/v1/verification/changePwd',
      };
    },
  },
  async created() {
    const animationRes = await get(`${window.location.href.split('#')[0]}login-animation.json`);

    this.animationConfig = {
      basicOptions: {
        animationData: animationRes,
        loop: false,
      },
      position: {
        top: 0,
        left: 13,
      },
      followPlayingSegments: [100, 200],
    };
  },
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  .header-left {
    font-size: 18px;
    color: white;
    justify-content: flex-start !important;
  }
}
.lh38 {
  line-height: 38px;
}
</style>
