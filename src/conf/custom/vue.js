/**
 * 对Vue的设置
 * 比如加载全局组件,设置vue对象变量
 */
import Vue from 'vue';
import MemoryParams from '@candy/vue-plugin-memory-params';
import ElementUI from 'element-ui';
import CandyUI from '@candy/ui';
import { base } from 'mx@';
/* eslint-disable-next-line */
import 'elStyle@'; // 导入主题
import 'element-ui/lib/theme-chalk/display.css';

Vue.use(ElementUI);
Vue.use(CandyUI);

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(MemoryParams, {
  store: true,
});

// 基础混合
Vue.mixin(base);

export default {};
