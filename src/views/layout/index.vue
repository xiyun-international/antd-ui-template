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

<style lang="less" scoped>
.ant-layout {
  background: white;
  // 如果用了CSS预处理器（less,scss）会被它们先解析，这是需要禁用解析 calc(~ '100vh - 120px') (less的写法）
  min-height: calc(~'100vh - 120px');
}
.ant-layout-header {
  background: #344e86;
  height: 50px;
  line-height: 50px;
  padding: 0;
}
.ant-layout-sider {
  background: #f8fafc;
  /deep/ .ant-menu-sub.ant-menu-inline {
    background: inherit;
  }
  .ant-menu {
    border: none;
    background: none;
    margin-top: 0;
  }
}
.ant-layout-content {
  padding: 20px;
}
.ant-layout-footer {
  height: 70px;
  line-height: 70px;
  text-align: center;
  padding: 0;
  color: #999;
  font-weight: normal;
}
</style>
