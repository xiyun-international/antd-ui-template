<template>
  <xy-context
    :breadcrumb="[
      { name: '服务商中心', path: '' },
      { name: '协作费管理', path: '' },
      { name: '账单详情' },
    ]"
    title="账单详情"
    tag="审核中"
    :tag-status="5"
  >
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <div slot="right">
      <a-button type="primary">打印账单</a-button>
    </div>
  </xy-context>
</template>

<script>
export default {
  name: 'p1',
};
</script>

<style scoped></style>
