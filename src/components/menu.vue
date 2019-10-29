<template>
  <a-menu
    class="menu"
    theme="dark"
    :inlineIndent="25"
    mode="inline"
    v-model="selectedKeys"
    :openKeys.sync="openKeys"
    @click="handleClick"
  >
    <template v-for="item in menuData">
      <!-- 一级菜单 -->
      <template v-if="('children' in item && item.children.length === 0) || !('children' in item)">
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
// 找到默认选中的菜单数据
function findActiveMenu(path, menus, res = '') {
  menus.forEach(item => {
    if (item.index === path && item.children.length === 0) {
      res = item;
    } else if (item.children.length > 0) {
      res = findActiveMenu(path, item.children, res);
    }
  });
  return res;
}

export default {
  name: 'MenuNav',
  props: {
    menuData: {
      type: Array,
      default() {
        return [];
      },
    },
    setIframe: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
    };
  },
  watch: {
    menuData(val) {
      if (val.length) {
        const { curMenu } = this.getPath();
        const activeMenu = findActiveMenu(curMenu, val);
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
  },
  methods: {
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
      const activeMenu = findActiveMenu(key, this.menuData);
      if (activeMenu.isIframe) {
        this.setIframe({
          url: activeMenu.url,
          random: Math.random(),
        });
      }
      this.$emit('click', activeMenu);
    },
  },
};
</script>
