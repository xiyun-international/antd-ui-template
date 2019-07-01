<template>
  <div class="header">
    <router-link class="logo" to="/">
      Logo
    </router-link>
    <div class="right">
      <a-dropdown>
        <span>欢迎</span>
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
