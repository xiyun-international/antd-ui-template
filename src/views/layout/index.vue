<template>
  <a-layout class="layout">
    <a-layout-header v-if="!isSimpleLayout">
      <xy-header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="256" v-if="!isSimpleLayout">
        <xy-menu :menu-data="menu" :set-iframe="setIframe" />
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer v-if="!isSimpleLayout">
          <xy-footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import { setToken } from '@xiyun/utils';
import XyMenu from '@/components/menu.vue';
import XyHeader from './part/header.vue';
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
    } else {
      this.fetchMenu();
    }
    // 请求用户数据，并存储在 vuex 中
    this.fetchUser();
  },
  computed: {
    isSimpleLayout() {
      return this.mode === 'simple';
    },
    ...mapState({
      menu: state => state.menu.menuData,
    }),
  },
  methods: {
    ...mapActions(['fetchMenu']),
    ...mapActions(['fetchUser']),
    ...mapMutations(['setIframe']),
  },
};
</script>

<style lang="less" scoped>
.content {
  background: #edf0f4;
}
</style>
