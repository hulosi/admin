import Vue from 'vue';
import Vuex from 'vuex';
import Persistence from '@candy/vuex-plugin-persistence';

import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import modules from './modules';


Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  plugins: [Persistence({
    storage: [
      'user.authInfo',
      'user.baseInfo',
      'menu.list',
    ],
    cachePrefix: '',
  })],
});

export default store;
