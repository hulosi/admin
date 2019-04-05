import axios from 'axios';
import qs from 'querystring';
import u from '@candy/utils';
import _ from 'lodash';

axios.defaults.paramsSerializer = params => qs.stringify(params);

function errPrefix() {
  return window.$h.apiErrorPrefix || '__HSCF__ERROR__';
}

export default class Fetch {
  constructor({
    baseUrl, timeout, option = {},
    requestSuccessInterceptor = Fetch.authRequestInterceptor,
    requestErrorInterceptor = Fetch.errorInterceptor,
    responseSuccessInterceptor = Fetch.hscfResponseInterceptor,
    responseErrorInterceptor = Fetch.errorInterceptor,
  }) {
    // 创建一个axios实例
    const _option = option;
    _option.baseURL = baseUrl || option.baseUrl || Fetch.getDefaultBaseUrl();
    _option.timeout = timeout || option.timeout || window.$h.requestTimeout;
    _option.headers = option.headers || {};
    _option.headers['Content-Type'] = option.headers['Content-Type'] || 'application/json';
    this.option = _option;
    this.axios = axios.create(_option);
    this.axios.interceptors.request.use(requestSuccessInterceptor, requestErrorInterceptor);
    this.axios.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);
  }

  getRequest() {
    return this.axios;
  }

  static getDefaultBaseUrl() {
    return window.$h.baseUrl;
  }

  /**
   * 空逻辑的请求拦截器
   * @param {*} config 请求配置
   */
  static async unauthRequestInterceptor(config) {
    return config;
  }

  /**
   * 验证安全权限的请求拦截器
   * @param {*} config 请求配置
   */
  static async authRequestInterceptor(config) {
    const _config = config;

    if (_config.$notPermission) return _config;

    try {
      const accessToken = await Fetch._getToken();
      _.set(_config, 'headers.Authorization', accessToken);
      return _config;
    } catch (error) {
      throw new Error(`${errPrefix()}L401-${error.message}`);
    }
  }

  /**
   * 获取token.
   * 私有函数,请勿外部调用.
   */
  static async _getToken() {
    const {
      refreshToken,
      accessToken,
      lastUpdateTime,
      expiresIn,
    } = window.$h.getAuthInfo() || {};

    if (!accessToken) {
      Fetch._login();
      throw new Error('你尚未登录,正在跳转到登录页面');
    }

    // 如果不支持刷新token,则直接返回token
    if (!refreshToken
      || !_.isSafeInteger(lastUpdateTime)
      || !_.isSafeInteger(expiresIn)) {
      return accessToken;
    }

    const currentTime = new Date().getTime();
    const isExpired = (currentTime - lastUpdateTime) >= (
      expiresIn - window.$h.refreshTokenTolerantTime);
    if (!isExpired) {
      return accessToken;
    }

    if (!Fetch._refreshToken) {
      Fetch._refreshToken = axios.post('/auth/token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_secret: window.$h.clientSecret,
        client_id: window.$h.clientId,
      }, {
        baseURL: window.$h.authUrl,
        timeout: window.$h.requestTimeout,
        transformRequest: [params => qs.stringify(params)],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    }
    const userResult = await Fetch._refreshToken;
    const userAuth = userResult.data;
    window.$h.bus.emit('setLoginInfo', {
      refreshToken: userAuth.refresh_token,
      accessToken: userAuth.access_token,
      lastUpdateTime: new Date().getTime(),
      expiresIn: userAuth.expires_in * 1000,
      scope: userAuth.scope,
    });
    return accessToken;
  }

  /**
   * 登出.
   * 私有函数,请勿外部调用.
   */
  static _logout() {
    window.$h.bus.emit('logout');
  }

  /**
   * 登录操作.
   * 私有函数,请勿外部调用.
   */
  static _login() {
    window.$h.bus.emit('login');
  }

  /**
   * 处理无权限情况.
   * 私有函数,请勿外部调用.
   */
  static _handleUnauthorized() {
    Fetch._logout();
    throw new Error(`${errPrefix()}401-无权限，请重新登录`);
  }

  /**
   * 标准处理异常的拦截器,可用于请求或者响应拦截器
   */
  static errorInterceptor = async (error) => {
    // Request failed with status code 401
    let _error = error;

    // 如果是401错误
    if (_.isError(error) && error.message === 'Request failed with status code 401') {
      try {
        Fetch._handleUnauthorized();
      } catch (err) {
        _error = err;
      }
    }

    if (_.isString(_error)) {
      _error = new Error(_error);
    }

    let err = null;
    if (_.startsWith(_error.message, errPrefix())) {
      err = new Error(_error.message.replace(errPrefix(), ''));
    } else {
      err = new Error('L500-网络异常，发送请求失败');
    }

    const message = err.message.split('-')[1];
    const showErrorFn = _.get(window, '$h.$message.error');
    showErrorFn && showErrorFn(message);

    throw err;
  }

  /**
   * 根据hscf协议的数据解析响应拦截器
   * hscf返回数据协议请看:
   */
  static hscfResponseInterceptor = async (response) => {
    try {
      const result = await u.lang.strategy({
        async 200() {
          const { data } = response;
          const factory = {
            async 200() {
              return data.data;
            },
            401: Fetch._handleUnauthorized,
            async 700() {
              Fetch._logout();
              throw new Error(`${errPrefix()}700-${data.message}`);
            },
            async 760() {
              const $message = _.get(window, '$h.$message');
              $message && $message.closeAll();
              const $confirm = _.get(window, '$h.$confirm');
              if ($confirm) {
                await $confirm(data.message, '提示', {
                  confirmButtonText: '确定',
                  type: 'warning',
                  showCancelButton: false,
                  closeOnClickModal: false,
                  closeOnPressEscape: false,
                });
              }
              Fetch._logout();
              throw new Error(`${errPrefix()}760-${data.message}`);
            },
          };
          const rst = await u.lang.strategy(factory, String(data.code), async () => {
            throw new Error(`${
              errPrefix()}${data.code || 'null'}-${
              data.message || '后台的数据结构有误'}`);
          });
          return rst;
        },
        401: Fetch._handleUnauthorized,
      }, String(response.status), async () => {
        throw new Error(`${
          errPrefix()}${
          response.status}-网络出现错误, http状态码为:${response.status}`);
      });
      return result;
    } catch (error) {
      await Fetch.errorInterceptor(error);
    }
    return null;
  }

  /**
   * 简单的数据解析响应拦截器.
   * 只是简单的返回一个data
   */
  static plainDataResponseInterceptor = async (response) => {
    try {
      return response.data;
    } catch (error) {
      await Fetch.errorInterceptor(error);
    }
    return null;
  }

  /**
   * 创建一个指定baseUrl的请求实例
   * @param {*} baseUrlOrOption 如果是字符串则根据url创建请求,如果是对象,则根据一个请求配置对象创建请求
   * @param {*} timeout 请求的超时时间,默认为配置文件中的requestTimeout
   */
  static makeRequestIns(baseUrl, timeout = window.$h.requestTimeout) {
    if (_.isString(baseUrl)) {
      return new Fetch({ baseUrl, timeout }).getRequest();
    }

    const option = baseUrl;
    return new Fetch(option).getRequest();
  }

  /**
   * 创建一个url为base基础的请求实例,该实例为一个ajax对象.
   * 该实例的基础url是配置文件中的baseUrl
   * @param {*} option 请求配置信息
   */
  static makeBaseRequestIns(option = {}) {
    const _option = option;
    _option.baseUrl = window.$h.baseUrl;
    return new Fetch(_option).getRequest();
  }

  /**
   * 创建一个url为base基础的请求实例,不需要token验证的请求.
   * 该实例的基础url是配置文件中的baseUrl
   * @param {*} option 请求配置信息
   */
  static makeBaseRequestInsWithUnauth(option = {}) {
    const _option = option;
    _option.baseUrl = window.$h.baseUrl;
    _option.requestSuccessInterceptor = Fetch.unauthRequestInterceptor;
    return new Fetch(_option).getRequest();
  }

  /**
   * 创建一个权限系统请求实例,该实例已权限系统基础url作为基础url.
   * 该请求无需验证,没有对返回的数据做处理
   * 该实例的基础url是配置文件中的authUrl
   * @param {*} option 请求配置信息
   */
  static makeAuthRequestInsWithUnauthAndPlain(option = {}) {
    const _option = option;
    _option.baseUrl = window.$h.authUrl;
    _option.requestSuccessInterceptor = Fetch.unauthRequestInterceptor;
    _option.responseSuccessInterceptor = Fetch.plainDataResponseInterceptor;
    const ins = new Fetch(_option).getRequest();
    return ins;
  }

  /**
   * 创建一个用户分页的请求
   * @param {String} url 请求的url地址
   * @param {Object} option 请求的配置信息
   * @param {Function} callback 定制化请求参数的回调函数
   * @param {Object} ins 请求实例,默认是baseurl的实例
   */
  static makePagingRequest(url, option = {}, callback, ins) {
    return function list(query = {}, pageIndex = 1, pageSize = 10, sortBy = []) {
      let params = query;
      params.pageNum = pageIndex;
      params.pageSize = pageSize;

      if (sortBy) {
        const jsonItems = sortBy
          .filter(item => !_.isNil(item.order))
          .sort((itemA, itemB) => itemA.order - itemB.order)
          .map(item => `"${item.prop}":"${item.order}"`);
        const json = `{${jsonItems.join(',')}}`;
        params._sortColumn = encodeURIComponent(json);
      }
      callback && (params = callback(params));

      const _option = option;
      _option.params = params;
      const _ins = ins || Fetch.makeBaseRequestIns();
      return _ins.get(url, _option);
    };
  }

  static makeFormDataRequest(url, option = {}, callback, ins) {
    return function request(data) {
      let _formData;
      let _url = url;
      let _option = option;
      if (!_.get(_option, 'headers.Content-Type')) {
        _.set(_option, 'headers.Content-Type', 'multipart/form-data');
      }
      if (callback) {
        const {
          url: __url, formData: __formData, option: __option,
        } = callback(data, option);
        _formData = __formData;
        _url = __url;
        _option = __option;
      } else {
        _formData = new FormData();
        Object.keys(data).forEach((key) => {
          _formData.append(key, data[key]);
        });
      }

      const _ins = ins || Fetch.makeBaseRequestIns();
      const req = _ins.post(_url, _formData, _option);
      return req;
    };
  }

  static makeUploadRequest(url, option = {}, callback, ins) {
    return function upload(data, onProgress) {
      const _option = option;

      _option.onUploadProgress = (progressEvent) => {
        onProgress(progressEvent);
      };
      let cancel;
      _option.cancelToken = new axios.CancelToken((c) => {
        cancel = c;
      });

      const req = Fetch.makeFormDataRequest(url, _option, callback, ins)(data);
      req.abort = cancel;
      return req;
    };
  }
}
