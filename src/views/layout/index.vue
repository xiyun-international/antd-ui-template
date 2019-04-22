<template>
  <a-layout class="layout">
    <a-layout-header>
      <xy-header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="230">
        <xy-menu />
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer>
      <xy-footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
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
};
</script>

<style lang="less" scoped></style>
