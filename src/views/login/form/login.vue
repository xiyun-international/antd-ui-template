<template>
  <div>
    <h1>账号登录</h1>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <div class="username-box">
        <i class="username-icon zt-zh" />
        <a-form-item>
          <a-input
            placeholder="请输入您的账号"
            v-decorator="['username', { rules: [{ required: true, message: '请输入您的账号' }] }]"
          />
        </a-form-item>
      </div>

      <div class="password-box">
        <i class="password-icon zt-mima" />
        <a-form-item>
          <a-input
            type="password"
            placeholder="请输入您的密码"
            v-decorator="['password', { rules: [{ required: true, message: '请输入您的账号' }] }]"
          />
        </a-form-item>
      </div>

      <a-button type="primary" html-type="submit" class="submit">
        登录
      </a-button>

      <div class="buttons">
        <router-link to="/auth">使用支付宝登录</router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
import { message } from 'ant-design-vue';
import { setToken } from '@xiyun/utils';
import router from '@/router/index';

export default {
  name: 'login',
  data() {
    return {
      form: this.$form.createForm(this),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!values.username) {
          message.error('请输入您的账号');
          return;
        }
        if (!values.password) {
          message.error('请输入您的密码');
          return;
        }
        this.$post('/v1/user/login', values).then(res => {
          setToken(res.data.token);
          message.success(res.msg);
          router.replace('/');
        });
      });
    },
  },
};
</script>

<style lang="less"></style>
