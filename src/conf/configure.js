/**
 * vue的配置.
 * 一些配置需要在所有文件加载之前就配置好.
 */

import Vue from 'vue';

Vue.config.productionTip = false;

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

// 配置candy/ui
window.$cdConfig = {
  appName: process.env.VUE_APP_APP_NAME,
  baseUrl: process.env.BASE_URL,
};
