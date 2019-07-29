<template>
  <a-menu
    style="padding: 0; width: 100%"
    :inlineIndent="42"
    mode="inline"
    v-model="selectedKeys"
    :openKeys.sync="openKeys"
    @click="handleClick"
  >
    <template v-for="item in menu">
      <!-- 一级菜单 -->
      <template v-if="!('children' in item) || item.children.length === 0">
        <a-menu-item :key="item.index">
          <router-link :to="item.index">
            <a-icon :type="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </a-menu-item>
      </template>

      <!-- 二级菜单 -->
      <template v-else>
        <a-sub-menu :key="item.index">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span>{{ item.name }}</span>
          </span>
          <a-menu-item v-for="children in item.children" :key="children.index">
            <router-link :to="children.index">
              {{ children.name }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import { findDefaultActiveMenu } from '@/utils/menu';

export default {
  name: 'MenuNav',
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
    };
  },
  computed: {
    ...mapState({
      menu: state => state.menu.menuData,
    }),
  },
  watch: {
    menu(val) {
      if (val.length) {
        const { curMenu } = this.getPath();
        const activeMenu = findDefaultActiveMenu(curMenu, val);
        if (activeMenu.isIframe) {
          this.setIframe({
            url: activeMenu.url,
            random: Math.random(),
          });
        }
      }
    },
  },
  created() {
    const { route, curMenu } = this.getPath();
    this.selectedKeys = [curMenu];
    this.openKeys = [`/${route[1]}`];
    this.fetchMenu();
  },
  methods: {
    ...mapActions(['fetchMenu']),
    ...mapMutations(['setIframe']),
    getPath() {
      const { path } = this.$route;
      const route = path.split('/');
      let curMenu = path;
      if (route.length >= 3) {
        curMenu = `/${route[1]}/${route[2]}`;
      }
      if (path === '/') {
        curMenu = '/index';
      }
      return { route, curMenu };
    },
    handleClick({ key }) {
      const activeMenu = findDefaultActiveMenu(key, this.menu);
      if (activeMenu.isIframe) {
        this.setIframe({
          url: activeMenu.url,
          random: Math.random(),
        });
      }
    },
  },
};
</script>
