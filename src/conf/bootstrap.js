/**
 * 引导程序,会在程序的启动时开始运行。
 */
/* disbled-eslint */
import Vue from 'vue';
import App from './App.vue';

import store from './store';
import router from './router';
import * as custom from './custom';

const beforeList = [];
const afterList = [];

Object.keys(custom).forEach((key) => {
  const cus = custom[key];
  if (cus.before) beforeList.push(cus.before);
  if (cus.after) afterList.push(cus.after);
});

export default () => {
  beforeList.forEach(before => before({ router, store }));
  const vue = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    render(createElement) {
      return createElement(App);
    },
  });
  afterList.forEach(after => after({ vue, router, store }));
};
