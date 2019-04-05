/**
 * 应用上下文配置,主要配置所需要的window环境
 * 一些配置需要在所有文件加载之前就配置好.
 */

import Vue from 'vue';
import u from '@candy/utils';
import _ from 'lodash';

import '@candy/ui/asset/reset.scss';
// candy-ui工具样式
import '@candy/ui/asset/utils.scss';
// element-ui的响应式工具函数
import 'element-ui/lib/theme-chalk/display.css';

import config from '../config';

Vue.config.productionTip = false;
Vue.config.devtools = true;

// 配置element
Vue.prototype.$ELEMENT = { size: 'small' };

// 配置candy/ui
window.$c = {
  appName: process.env.VUE_APP_APP_NAME,
  baseUrl: process.env.BASE_URL,
};

window.$h = {
  bus: u.bus,
  ...config,
};

export default {
  after({ vue, store }) {
    window.$c.$loading = Vue.prototype.$loading;
    window.$c.$msgbox = Vue.prototype.$msgbox;
    window.$c.$alert = Vue.prototype.$alert;
    window.$c.$confirm = Vue.prototype.$confirm;
    window.$c.$prompt = Vue.prototype.$prompt;
    window.$c.$notify = Vue.prototype.$notify;
    window.$c.$message = Vue.prototype.$message;

    window.$h.getAuthInfo = () => {
      const info = _.get(store, 'state.user.authInfo');
      return info || {};
    };
    window.$h.bus.on('setLoginInfo', async (loginInfo) => {
      store.commit('setUserAuthInfo', loginInfo);
      const userApi = await import('api@/user-api.js');
      const menuApi = await import('api@/menu-api.js');
      const userBaseInfo = await userApi.getCurrentUser();
      store.commit('setUserBaseInfo', userBaseInfo);
      let menuList = await menuApi.getRoleMenus();
      window.$h.customerMenu && (menuList = window.$h.customerMenu(menuList));
      store.commit('setMenuList', menuList);
    });
    window.$h.bus.on('logout', () => {
      store.commit('rmUserBaseInfo');
      store.commit('rmUserAuthInfo');
      store.commit('rmMenuList');
      window.$h.bus.emit('login');
    });
    window.$h.bus.on('login', async () => {
      window.$c.$message.closeAll();
      const baseUrl = process.env.BASE_URL || '/';
      vue.$router.push(`${baseUrl}login`);
    });
  },
};
