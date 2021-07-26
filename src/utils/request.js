import axios from 'axios';
import { notification } from 'antd';
import { history, getDvaApp } from 'umi';

/* const codeMessage = {
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
}; */

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'Data Deleted Successfully',
  400: 'There was an error in the request sent, and the server did not create or modify data. ',
  401: 'The user does not have permission (token, username, password error).',
  403: 'The user is authorized, but access is forbidden.',
  404: 'The request sent was for a record that did not exist.',
  406: 'The requested format is not available.',
  410: 'The requested resource is permanently deleted and will no longer be available.',
  422: 'When creating an object, a validation error occurred.',
  500: 'An error occurred on the server, please check the server. ',
  502: 'Gateway error.',
  503: 'The service is unavailable. The server is currently unavailable (overloaded or down).',
  504: 'Gateway Timeout',
};

export const baseURL = 'http://localhost:4000/';
const withCredentials = false;
const timeout = 30000;

const axiosInstance = axios.create({
  baseURL,
  withCredentials,
  timeout,
});

// 添加请求拦截器 在发送请求之前做些什么
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || '';
  /* eslint-disable no-param-reassign */
  config.headers.Authorization = token;
  return config;
});

// 添加响应拦截器 对响应数据做点什么
axiosInstance.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type'];
    if (
      contentType &&
      contentType.match(/application\/json/i) &&
      response.data.token
    ) {
      localStorage.setItem('token', response.data.token);
    }
    return Promise.resolve(response);
  }, // 对响应错误做点什么
  (error) => {
    const { response } = error;
    const { status } = response;
    if (status !== 401) {
      notification.error({
        //通知提醒标题，必选
        message: response.data.message || codeMessage[status],
        duration: 10, //默认 4.5 秒后自动关闭，配置为 null 则不自动关闭
      });
    }
    if (status === 401) {
      //用户没有权限
      // @HACK
      /* eslint-disable no-underscore-dangle */
      /* Action 很简单，就是一个单纯的包含 { type, payload } 的对象，
      type 是一个常量用来标示动作类型，payload 是这个动作携带的数据。
      Action 需要通过 store.dispatch() 方法来发送。 */
      getDvaApp()._store.dispatch({
        type: 'login/logout',
        payload: {
          error: response?.data?.error,
        },
      });
    } else if (status === 403) {
      history.push('/exception/403');
    } else if (status >= 500 && status <= 504) {
      history.push('/exception/500');
    } else if (status >= 404 && status < 422) {
      history.push('/exception/404');
    }
    return Promise.reject(response);
  },
);

/**
 * Requests a path, returning a promise.
 *
 * @param  {string} path       The path we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
  return axiosInstance(options)
    .then((response) => response)
    .catch((error) => error);
}
