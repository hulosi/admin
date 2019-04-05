import u from '@candy/utils';
import axios from 'axios';
import cookie from 'js-cookie';
import qs from 'querystring';

/**
 *  直接accessToken放在url的请求.
 *  常用于第三方系统跳转过来的url解析,如srm.
 */
export default class TmTokenConverter {
  test() {
    const company = u.url.query(window.location.href, 'x_co');
    const system = u.url.query(window.location.href, 'x_ss');
    this.company = company;
    this.system = system;
    if (company === 'tianma' && system === 'oa') {
      this.tokenName = 'LtpaToken';
      return true;
    }
    if (company === 'tianma' && system === 'sourcing') {
      this.tokenName = 'SocToken';
      return true;
    }
    return false;
  }

  async convert() {
    const tmToken = u.urlquery(window.location.href, 'x_token') || cookie.get(this.tokenName);
    if (!tmToken) {
      throw new Error('获取外部系统token失败');
    }

    const result = await axios.post('/auth/token', {
      grant_type: 'client_credentials',
      client_id: window.$h.clientId,
      client_secret: window.$h.clientSecret,
      x_external_token: encodeURI(tmToken),
      x_company_code: this.company,
      x_system_code: this.system,
    }, {
      baseURL: window.$h.authUrl,
      timeout: window.$h.requestTimeout,
      transformRequest: [params => qs.stringify(params)],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const userAuth = result.data;

    if (!userAuth || !userAuth.refresh_token || !userAuth.refresh_token || !userAuth.expires_in) {
      throw new Error(userAuth.message || '自动登录失败,请重新跳转');
    }

    window.$h.bus.emit('setLoginInfo', {
      refreshToken: userAuth.refresh_token,
      accessToken: userAuth.access_token,
      expiresIn: userAuth.expires_in * 1000,
      lastRefreshTime: new Date().getTime(),
      scope: userAuth.scope,
    });

    let url = u.url.removeQuery(window.location.href, 'x_co');
    url = u.url.removeQuery(window.location.href, 'x_ss');
    url = u.url.removeQuery(window.location.href, 'x_token');
    window.history.replaceState('', '', url);
  }
}
