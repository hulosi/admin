import Fetch from './fetch';

const ajax = Fetch.makeBaseRequestIns();

const api = {};

/**
 * 分页查询角色
 */
api.paging = Fetch.makePagingRequest('/roles');

/**
 * 新增角色
 */
api.add = role => ajax.post('/roles', role);

/**
 * 修改角色
 */
api.update = role => ajax.put('/roles', role);

export default api;
