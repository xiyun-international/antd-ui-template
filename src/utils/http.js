import { http, removeToken } from '@xiyun/utils';
import { message } from 'ant-design-vue';
import Router from '@/router/index';

const apiUrl = process.env.VUE_APP_API;

message.config({
  maxCount: 1,
});

http.config({
  baseURL: apiUrl,
  // 如果要使用 qs.stringify 格式化 post 参数，请设为 true
  isUseQs: true,
});

// 处理业务错误
http.bizErrorHandler(res => {
  if (res.layers) {
    // 请求动画JSON
    return res;
  }
  // 示例
  const { code, msg } = res;
  switch (code) {
    // 成功
    case 200:
      return res;
    case 401:
      message.error('登录过期，请重新登录');
      removeToken();
      Router.replace('/login');
      return Promise.reject(JSON.stringify({ code, msg }));
    default:
      message.error(msg);
      return Promise.reject(JSON.stringify({ code, msg }));
  }
});

// 处理400、500等非业务错误
// http.catchErrorHandler(res => {
//   message({
//     type: 'error',
//     message: res,
//   })
// });

function post(api, params = {}, selfHandleError = false) {
  return http.post(api, params, selfHandleError);
}

function get(api, params = {}, selfHandleError = false) {
  return http.get(api, params, selfHandleError);
}

export { post, get };
