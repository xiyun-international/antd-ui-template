<template>
  <div class="bg">
    <a-row class="header">
      <a-col :span="2" align="left">禧鹊HOME</a-col>
      <a-col :span="22" align="right">客服电话：400-100-5619</a-col>
    </a-row>
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
            <span>欢迎使用</span>
          </div>
          <a-form :form="form" @keyup.enter="handleSubmit">
            <div class="username-box">
              <a-icon slot="prefix" type="user" />
              <input placeholder="请输入您的账号" v-model="username" autocomplete="off" />
            </div>
            <div class="password-box">
              <a-icon slot="prefix" type="lock" />
              <input
                placeholder="请输入您的密码"
                type="password"
                v-model="password"
                autocomplete="off"
              />
            </div>
            <div class="forget-passord">
              <a href="javascript:void(0);" @click="forgetIsShow = true">忘记密码?</a>
            </div>
            <button class="login-btn" @click="handleSubmit">登录</button>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <div class="wave">
      <div class="footer">
        <p class="copyright">
          Copyright © Beijing Xiyun Co., Ltd., All Rights Reserved 京ICP备17056788号-1
        </p>
        <p>北京禧云信息科技有限公司版权所有</p>
      </div>
    </div>
    <a-modal title="忘记密码" v-model="forgetIsShow" @cancel="handleForgetModal">
      <a-form :form="forgetForm" @submit="validateCode" @keyup.enter="validateCode">
        <a-form-item>
          <a-input
            maxlength="11"
            v-decorator="[
              'mobile',
              {
                initialValue: forgetForm.mobile,
                rules: [
                  { required: true, message: '请输入手机号' },
                  {
                    validator: (rules, value, callback) => {
                      if (value !== '') {
                        if (!validMobile(value)) {
                          callback('手机号码格式不正确');
                        }
                      }
                      callback();
                    },
                    trigger: 'blur',
                  },
                ],
              },
            ]"
            placeholder="请输入手机号"
            auto-complete="off"
          />
        </a-form-item>
        <a-form-item>
          <a-row>
            <a-col :span="16">
              <a-input
                v-decorator="[
                  'code',
                  {
                    initialValue: forgetForm.code,
                    rules: [{ required: true, message: '验证码' }],
                  },
                ]"
                placeholder="验证码"
                auto-complete="off"
                maxlength="6"
              />
            </a-col>
            <a-col :span="7" :offset="1">
              <countdown-btn
                v-if="forgetIsShow"
                @click="handleCountDown"
                :is-send.sync="isSend"
              ></countdown-btn>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div>
          <a-button type="primary" @click="validateCode">确认</a-button>
        </div>
      </template>
    </a-modal>
    <a-modal title="设置新密码" v-model="validateIsShow" @cancel="handleNewModal">
      <a-form :form="newForm" ref="gridValidate">
        <a-form-item>
          <a-input
            placeholder="请输入密码"
            type="password"
            auto-complete="off"
            v-decorator="[
              'newPassword',
              {
                initialValue: newForm.newPassword,
                rules: [
                  {
                    required: true,
                    min: 6,
                    max: 14,
                    message: '最大长度 14 个字符，最小限制 6 个字符',
                    trigger: 'blur',
                  },
                ],
              },
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="请再次输入密码"
            type="password"
            auto-complete="off"
            v-decorator="[
              'confirmPassword',
              {
                initialValue: confirmPassword,
                rules: [
                  {
                    required: true,
                    min: 6,
                    max: 14,
                    message: '最大长度 14 个字符，最小限制 6 个字符',
                    trigger: 'blur',
                  },
                  {
                    validator: (rule, value, callback) =>
                      validatePass(newForm.getFieldValue('newPassword'), rule, value, callback),
                  },
                ],
              },
            ]"
          ></a-input>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div>
          <a-button type="primary" @click="updatePassword">确认</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { setToken, validMobile } from '@xiyun/utils';
import { XyCountdownButton } from '@xiyun/ant-design-ui';
import Lottie from './lottie.vue';
import json from './animation.json';

export default {
  name: 'login',
  components: {
    Lottie,
    countdownBtn: XyCountdownButton,
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
      anim: {},
      defaultOptions: { animationData: json, loop: false },
      forgetIsShow: false,
      validateIsShow: false,
      mobile: '',
      code: '',
      confirmPassword: '',
      newPassword: '',
      forgetForm: this.$form.createForm(this),
      newForm: this.$form.createForm(this),
      isSend: false,
    };
  },
  mounted() {
    // eslint-disable-next-line
    let svg = document.getElementsByTagName('svg')[0];
    const ratioInit = (document.body.clientWidth * 0.6) / 1200 - 0.2;
    svg.style.transform = `scale(${ratioInit > 1 ? ratioInit : 1})`;
    // eslint-disable-next-line
    window.onresize = function() {
      // eslint-disable-next-line
      let ratio = (document.body.clientWidth * 0.6) / 1200 - 0.2;
      svg.style.transform = `scale(${ratio > 1 ? ratio : 1})`;
    };

    this.form.validateFields([]);
  },
  methods: {
    validMobile,
    // 请求登录接口
    handleSubmit() {
      if (this.username === '') {
        this.$message.error('请输入您的账号');
        return;
      }
      if (this.password === '') {
        this.$message.error('请输入您的密码');
        return;
      }
      this.$post('/v1/user/login', {
        username: this.username,
        password: this.password,
      }).then(res => {
        setToken(res.resultObject);
        this.$router.replace('/');
      });
    },
    handleAnimation(anim) {
      this.anim = anim;
      this.anim.addEventListener('complete', () => {
        this.anim.playSegments([100, 200], false);
      });
    },
    /**
     * 验证短信验证码
     */
    validateCode(e) {
      e.preventDefault();
      this.forgetForm.validateFieldsAndScroll(err => {
        if (!err) {
          this.validateIsShow = true;
          // this.post('/v1/verification/checkVerCodeForPwd', {
          //   userName: this.mobile,
          //   verificationCode: this.code,
          // }).then(res => {
          //   const code = res.bizContent.checkVerificationCode;
          //   if (!code) {
          //     this.$message.error(res.message);
          //   } else {
          //     this.validateIsShow = true;
          //   }
          // });
        }
      });
    },
    /**
     * 更新密码
     */
    updatePassword() {
      this.newForm.validateFieldsAndScroll(err => {
        if (!err) {
          const params = {
            userName: this.forgetForm.mobile,
            password: this.newPassword,
            confirmPassword: this.confirmPassword,
            verificationCode: this.forgetForm.code,
          };
          this.$post('/v1/verification/changePwd', params).then(res => {
            if (res.code === 200) {
              this.$message({ type: 'success', message: res.message });
              this.forgetIsShow = false;
              this.validateIsShow = false;
            } else {
              this.$message({ type: 'error', message: res.message });
            }
          });
        }
      });
    },
    handleForgetModal() {
      this.forgetForm.resetFields();
    },
    handleNewModal() {
      this.newForm.resetFields();
    },
    /**
     * 发送验证码
     */
    handleCountDown() {
      setTimeout(() => {
        this.isSend = true;
      }, 1000);
      this.$post('api', { phone: '' })
        .then(res => {
          if (res) {
            this.isSend = true;
          } else {
            this.$message({
              message: res.message,
              type: 'error',
            });
            this.isSend = false;
          }
        })
        .catch(() => {
          this.isSend = false;
        });
    },
    /**
     * 重设密码校验是否重复
     */
    validatePass(newPassword, rule, value, callback) {
      if (newPassword !== value) {
        callback('登录密码与确认密码不一致');
      }
      callback();
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
  background: linear-gradient(
    207deg,
    rgba(0, 160, 255, 1) 0%,
    rgba(19, 90, 255, 1) 67%,
    rgba(28, 55, 255, 1) 100%
  );

  .anime {
    margin: -14% 0 0 15%;
  }
  .header {
    margin-top: 27px;
    padding: 0 40px;
    font-size: 16px;
    color: white;
  }
  .login {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 8px -2px rgba(50, 93, 216, 1);
    border-radius: 6px;
    width: 70%;
    max-width: 345px;
    padding: 40px 30px;
    margin-top: 15vh;
    // min-height: 360px;
    height: 360px;
    form {
      height: 100%;
      width: 100%;
    }
    .login-title {
      margin-bottom: 10px;
      font-size: 22px;
      font-weight: 400;
      color: #50bfff;

      text-align: center;
    }
    .username-box {
      position: relative;
      width: 100%;
      top: 12%;
      height: 18%;
    }

    .password-box {
      position: relative;
      width: 100%;
      top: 19%;
      height: 18%;
    }

    .anticon-user {
      position: absolute;
      z-index: 999;
      font-size: 22px;
      top: 30%;
      left: 13px;
      color: #bfbfbf;
    }

    .anticon-lock {
      position: absolute;
      z-index: 999;
      font-size: 22px;
      top: 30%;
      left: 13px;
      color: #bfbfbf;
    }
    /* 忘记密码 */
    .forget-passord {
      position: relative;
      text-align: right;
      font-size: 14px;
      top: 24%;
      a {
        margin-top: 10px;
        color: #50bfff;
        text-decoration: none;
      }
    }
    .login-btn {
      display: block;
      position: relative;
      top: 28%;
      width: 100%;
      height: 13%;
      background: #0687ff;
      border: 0;
      border-radius: 2px;
      color: white;
    }
    input {
      font-size: 16px;
      outline: none;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #ccc;
      background: white;
      height: 100%;
      line-height: 30px;
      width: 100%;
      padding-left: 15%;
      &:-webkit-autofill {
        box-shadow: 0 0 0 40px white inset;
      }
      &:hover,
      &:focus {
        outline: none;
        border: none;
        border-bottom: 1px solid #0687ff;
        box-shadow: 0 0 0 40px white inset;
      }
    }
  }
  .wave {
    background-image: url('images/wave.png');
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 19.2%;
    background-repeat: no-repeat;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: white;
    text-align: center;
    font-size: 12px;
    p:first-child {
      margin-bottom: 0;
    }
    p:nth-child(2n) {
      margin-bottom: 2em;
    }
  }
  #svgId-statistical-table {
    perspective: 20;
    -webkit-perspective: 20;
    g {
      transform: rotateX(-30deg);
    }
  }
}
</style>
