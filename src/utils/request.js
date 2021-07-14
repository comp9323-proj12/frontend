import axios from 'axios';
import { notification } from 'antd';
import { history, getDvaApp } from 'umi';

const withCredentials = true;
const timeout = 30000;

const axiosInstance = axios.create({
  baseURL,
  withCredentials,
  timeout,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || '';
  /* eslint-disable no-param-reassign */
  config.headers.Authorization = token;
  return config;
});

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
  },
  (error) => {
    const { response } = error;
    const { status } = response;
    if (status !== 401) {
      notification.error({
        message: response.data.message || codeMessage[status],
        duration: 10,
      });
    }
    if (status === 401) {
      // @HACK
      /* eslint-disable no-underscore-dangle */
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

export const baseURL = 'http://localhost:4000/';

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
