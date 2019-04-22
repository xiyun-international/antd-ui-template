import axios from 'axios';
import { message, notification } from 'ant-design-vue';
import qs from 'qs';
import { getToken } from './token';
import router from '../router/index';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function returnErrorData(code, msg = '服务异常') {
  message.error(msg);
  throw new Error({
    code,
    msg,
    data: null,
    source: 'frontend',
  });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.config.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  return Promise.resolve(error);
}

function getUrl(url) {
  const protocol = document.location.protocol === 'https:' ? 'https' : 'http';
  if (url.indexOf('http') !== -1) {
    const newUrl = url.replace('https://', '').replace('http://', '');
    return `${protocol}://${newUrl}`;
  }
  return `${protocol}://${url}`;
}

/**
 * @param api
 * @param params
 * @param selfHandleError 是否自行处理业务错误，默认 false
 * @return {*}
 */
export default function(api, params, selfHandleError = false) {
  // 请求默认配置项
  const config = {
    headers: {},
    baseURL: '',
    timeout: 10000,
  };

  // 如果不是完整url，即接口请求时，就加上自定义header，并设置baseURL
  if (!/(http:\/\/)|(https:\/\/)/.test(api)) {
    config.headers = {
      Authorization: getToken(),
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    config.baseURL = getUrl(process.env.VUE_APP_API);
  } else {
    // Mock
    return axios.get(api).then(res => res.data);
  }

  // 格式化参数
  const formParams = qs.stringify(params, { arrayFormat: 'indices' });

  return axios
    .post(api, formParams, config)
    .then(checkStatus)
    .then(response => {
      // 如果是自行处理业务错误，那么就直接返回接口数据，不再统一处理。
      if (selfHandleError) {
        return response.data;
      }
      // 其它业务错误处理
      return response.data;
    })
    .catch(e => {
      const status = e.name;
      if (status === 403) {
        router.push('/exception/403');
        return returnErrorData(403);
      }

      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return returnErrorData(504);
      }

      if (status >= 404 && status < 422) {
        router.push('/exception/404');
        return returnErrorData(404);
      }

      // 不在可控范围内
      return returnErrorData(499, e.response);
    });
}
