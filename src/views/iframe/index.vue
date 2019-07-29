<template>
  <xy-frame :url="url"></xy-frame>
</template>

<script>
export default {
  name: 'iframeDemo',
  data() {
    return {
      url: 'http://www.baidu.com',
    };
  },
};
</script>

<style scoped></style>
