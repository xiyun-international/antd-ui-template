<template>
  <a-layout class="layout">
    <a-layout-header v-if="!isSimpleLayout">
      <xy-header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="230" v-if="!isSimpleLayout">
        <xy-menu />
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer v-if="!isSimpleLayout">
      <xy-footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { mapActions } from 'vuex';
import { setToken } from '@xiyun/utils';
import XyHeader from './part/header.vue';
import XyMenu from './part/menu.vue';
import XyFooter from './part/footer.vue';

export default {
  name: 'layout',
  components: {
    XyHeader,
    XyFooter,
    XyMenu,
  },
  data() {
    return {
      mode: process.env.VUE_APP_MODE,
    };
  },
  created() {
    if (this.isSimpleLayout) {
      // 每次刷新页面或重新进入页面都设置，避免token失效
      setToken(this.$route.query.token);
    }
    // 请求用户数据，并存储在 vuex 中
    this.fetchUser();
  },
  computed: {
    isSimpleLayout() {
      return this.mode === 'simple';
    },
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
};
</script>

<style lang="less" scoped></style>
