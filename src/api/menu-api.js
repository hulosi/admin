import Fetch from './fetch';

const ajax = Fetch.makeBaseRequestIns();

const api = {};

/**
 * 获取当前用户的目录列表
 */
api.getRoleMenus = () => ajax.get('/menus/roleMenus');

export default api;
