import _ from 'lodash';

export default class LoginRouterInterceptor {
  static async intercept({ to }) {
    const { accessToken } = window.$h.getAuthInfo() || {};
    if (accessToken) {
      return;
    }

    const whiteList = window.$h.loginWhiteList || [];

    let toPath = `/${to.path}`;
    if (`${process.env.BASE_URL}`) {
      toPath = toPath.replace(/\/\//g, '/');
      const baseUrl = `/${process.env.BASE_URL}/`.replace(/\/\//g, '/');
      toPath = toPath.replace(baseUrl, '');
      toPath = `/${toPath}`;
      toPath = toPath.replace(/\/\//g, '/');
    }
    const _whiteList = whiteList.map((url) => {
      let _url = url;
      if (_.isString(url)) {
        _url = `/${_url}`;
        _url = _url.replace(/\/\//g, '/');
      }
      return _url;
    });
    const isIgnore = _whiteList.find((item) => {
      if (_.isString(item)) {
        return toPath === item;
      }
      if (_.isRegExp(item)) {
        return item.test(toPath);
      }
      throw new Error('The login white list shoule be string or regexp');
    });
    if (isIgnore) {
      return;
    }

    window.$h.bus.emit('login');
    throw new Error('用户没用登录');
  }
}
