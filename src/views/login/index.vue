<template>
  <div class="bg">
    <a-row>
      <a-col :span="15">
        <lottie
          :options="defaultOptions"
          :width="74"
          v-on:animCreated="handleAnimation"
          class="anime"
        />
      </a-col>
      <a-col :span="9">
        <div class="login">
          <div class="login-title">
            <span>账号登录</span>
          </div>
          <a-form :form="form" @submit="handleSubmit" @keyup.enter="login">
            <a-form-item>
              <a-input
                size="large"
                placeholder="请输入账号"
                v-decorator="['username', { rules: [{ required: true, message: '请输入账号' }] }]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="请输入密码"
                v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <a-button
              size="large"
              class="login-btn"
              type="primary"
              html-type="submit"
              @click="handleSubmit"
            >
              登录
            </a-button>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <div class="footer">
      <p class="copyright">
        Copyright © Beijing Xiyun Co., Ltd., All Rights Reserved 京ICP备17056788号-1
      </p>
      <p>北京禧云信息科技有限公司版权所有</p>
    </div>
  </div>
</template>

<script>
import { setToken } from '@xiyun/utils';
import Lottie from './lottie.vue';
import json from './animation.json';

export default {
  name: 'login',
  components: {
    Lottie,
  },
  props: [],
  data() {
    return {
      form: this.$form.createForm(this),
      username: '',
      password: '',
      verification: '',
      verificationUrl: '',
      showVerification: false,
      heightLogin: 49,
      top: 22,
      passTop: 18,
      forgetTop: 22,
      svgWidth: 100,
      anim: {},
      defaultOptions: { animationData: json, loop: false },
    };
  },
  mounted() {
    // eslint-disable-next-line
    let svg = document.getElementsByTagName('svg')[0];
    const ratioInit = (document.body.clientWidth * 0.468) / 1460 - 0.3;
    svg.style.transform = `scale(${ratioInit > 1 ? ratioInit : 1})`;
    // eslint-disable-next-line
    window.onresize = function() {
      // eslint-disable-next-line
      let ratio = (document.body.clientWidth * 0.468) / 1460 - 0.3;
      svg.style.transform = `scale(${ratio > 1 ? ratio : 1})`;
    };

    this.form.validateFields([]);
  },
  methods: {
    // 请求登录接口
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$post('/login', {
            username: values.username,
            password: values.password,
          }).then(res => {
            setToken(res.data.token);
            this.$router.replace('/');
          });
        }
      });
    },
    handleAnimation(anim) {
      this.anim = anim;
      this.anim.addEventListener('complete', () => {
        this.anim.playSegments([108, 231], false);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bg {
  // 背景渐变
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(to bottom right, #0fb5fe, #3460fe);

  .anime {
    margin: 6% auto 0;
  }

  .login {
    background: #eaf1fe;
    box-shadow: 0 2px 15px -5px rgba(50, 93, 216, 1);
    border-radius: 4px;
    border: 1px solid rgba(230, 230, 230, 1);
    width: 70%;
    padding: 20px;
    margin-top: 40%;
    .login-title {
      font-size: 22px;
      font-weight: 400;
      color: #50bfff;
      margin-bottom: 10px;
      text-align: center;
    }
    .login-btn {
      width: 100%;
    }
  }

  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: white;
    text-align: center;
    font-size: 12px;
    p {
      margin-bottom: 1em;
    }
  }
}
</style>
