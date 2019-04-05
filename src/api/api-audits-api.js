import Fetch from './fetch';

// const ajax = Fetch.makeBaseRequestIns();

const api = {};

/**
 * 获取接口审计信息
 */
api.listApiAudits = Fetch.makePagingRequest('/apiAudits');

export default api;
