<template>
  <div class="header">
    <router-link class="logo" to="/">
      <i class="zt-xy"></i>
      <span class="title">禧云</span>
    </router-link>
    <div class="right">
      <a-dropdown>
        <span>欢迎 {{ name }} <i class="t-ML8 zt-jt"></i> </span>
        <a-menu slot="overlay">
          <a-menu-item> <a-icon type="logout" /> 退出登录 </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-nav',
  data() {
    return {
      name: '',
    };
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
    .zt-xy {
      margin-top: 12px;
      font-size: 28px;
      color: #fefefe;
      display: block;
    }
    .title {
      color: white;
      font-size: 14px;
      display: block;
      margin-left: 14px;
    }
  }
  .right {
    font-size: 14px;
  }
}
</style>
