import u from '@candy/utils';
import axios from 'axios';
import qs from 'querystring';

/**
 *  直接accessToken放在url的请求.
 *  常用于第三方系统跳转过来的url解析,如srm.
 */
export default class Oauth2TokenConverter {
  test() {
    // 登录后获取code值
    const code = u.url.query(window.location.href, 'code');
    if (code) {
      this.code = code;
      return true;
    }
    return false;
  }

  async convert() {
    if (!this.code) {
      throw new Error('转换oauth2回调token失败');
    }

    const userAuthResult = await axios.post('/auth/token', {
      grant_type: 'authorization_code',
      client_id: window.$h.clientId,
      client_secret: window.$h.clientSecret,
      redirect_uri: encodeURIComponent(window.location.href),
      code: this.code,
    }, {
      baseURL: window.$h.authUrl,
      timeout: window.$h.requestTimeout,
      transformRequest: [params => qs.stringify(params)],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const userAuthInfo = userAuthResult.data;
    if (!userAuthInfo) {
      throw new Error(userAuthResult.message || '自动登录失败,请重新跳转');
    }
    window.$h.bus.emit('setLoginInfo', {
      refreshToken: userAuthInfo.refresh_token,
      accessToken: userAuthInfo.access_token,
      expiresIn: userAuthInfo.expires_in * 1000,
      lastRefreshTime: new Date().getTime(),
      scope: userAuthInfo.scope,
    });

    let url = u.url.removeQuery(window.location.href, 'code');
    url = u.url.removeQuery(window.location.href, 'state');
    window.history.replaceState('', '', url);
  }
}
