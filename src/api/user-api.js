import config from 'conf@/config';
import Fetch from './fetch';

const ajax = Fetch.makeBaseRequestIns();
const authAjax = Fetch.makeAuthRequestInsWithUnauthAndPlain();

const api = {};

/**
 * 获取当前用户信息
 */
api.getCurrentUser = () => ajax.get('/users/currentUser');

/**
 * 登录
 */
api.login = loginInfo => authAjax.post('/auth/token', {
  grantType: 'password',
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  scope: '',
  ...loginInfo,
});

/**
 * 登录日志
 */
api.listLoginLogs = Fetch.makePagingRequest('/loginLogs');

export default api;
