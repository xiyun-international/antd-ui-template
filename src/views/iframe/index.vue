<template>
  <xy-frame :url="url"></xy-frame>
</template>

<script>
import { getToken } from '@xiyun/utils';

export default {
  name: 'iframeDemo',
  data() {
    return {
      url: '',
    };
  },
  watch: {
    '$store.state.menu.iframe': {
      deep: true,
      handler(iframe) {
        if (iframe.url) {
          this.setFrameUrl(iframe.url);
        }
      },
    },
  },
  mounted() {
    const { iframe } = this.$store.state.menu;
    if (Object.keys(iframe).length > 0) {
      this.setFrameUrl(iframe.url);
    }
  },
  methods: {
    setFrameUrl(url) {
      const token = getToken();
      if (url) {
        this.url = `${url}?token=${token}&frame_id=${Math.random()}`;
      } else {
        this.$message.error('应用地址解析错误');
      }
    },
  },
};
</script>

<style scoped></style>
