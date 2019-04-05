import u from '@candy/utils';

/**
 *  直接accessToken放在url的请求.
 *  常用于第三方系统跳转过来的url解析,如srm.
 */
export default class AccessTokenConverter {
  test() {
    const srmToken = u.url.query(window.location.href, 'accessToken');
    if (srmToken) {
      this.srmToken = srmToken;
      return true;
    }
    return false;
  }

  async convert() {
    try {
      if (!this.srmToken) {
        throw new Error('转换accessToken失败');
      }

      window.$h.bus.emit('setUserAuthInfo', {
        accessToken: this.srmToken,
      });
      const url = u.url.removeQuery(window.location.href, 'accessToken');
      window.history.replaceState('', '', url);
    } catch (e) {
      throw e;
    }
  }
}
