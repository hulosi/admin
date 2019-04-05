/**
 * 对Vue的设置
 * 比如加载全局组件,设置vue对象变量
 */
import Vue from 'vue';
import MemoryParams from '@candy/vue-plugin-memory-params';
import ElementUI from 'element-ui';
/* eslint-disable-next-line */
import 'elStyle@'; // 导入主题
import CandyUI from '@candy/ui';
import { base } from 'mx@';


Vue.use(ElementUI);
Vue.use(CandyUI);

export default {
  after({ router }) {
    // 基础混合
    Vue.mixin(base);
    Vue.use(MemoryParams, {
      store: true,
      router,
    });
  },
};
