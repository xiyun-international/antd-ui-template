<template>
  <xy-context :breadcrumb="[{ name: '用户管理', path: '' }, { name: '新增用户' }]" title="新增用户">
    <xy-title title="基础信息" size="normal" style="margin-top: unset;"></xy-title>
    <a-form :form="form" @submit="onSubmit">
      <a-form-item v-bind="middleLayout">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请填写姓名' }],
            },
          ]"
          placeholder="请填写姓名"
          :maxLength="20"
        />
      </a-form-item>
      <a-form-item v-bind="buttonLayout">
        <a-button type="primary" htmlType="submit">
          提交审核
        </a-button>
      </a-form-item>
    </a-form>
  </xy-context>
</template>

<script>
export default {
  name: 'createDemo',
  data() {
    return {
      form: this.$form.createForm(this),
      middleLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      },
      buttonLayout: {
        wrapperCol: { span: 8, push: 8 },
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.$post('/create', values).then(() => {
          this.$message.success('创建成果');
          this.$router.replace('/other/list');
        });
      });
    },
  },
};
</script>

<style scoped></style>
