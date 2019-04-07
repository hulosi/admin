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

/**
 * 分页查询用户
 */
api.paging = Fetch.makePagingRequest('/users');

/**
 * 查询用户
 */
api.get = id => ajax.get(`/users/${id}`);

/**
 * 新增用户
 */
api.add = user => ajax.post('/users', user);

/**
 * 修改用户
 */
api.update = user => ajax.put('/users', user);

export default api;
