<template>
  <div id="root">
    <a-locale-provider :locale="zhCN">
      <router-view></router-view>
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'app',
  data() {
    return {
      zhCN,
    };
  },
};
</script>
