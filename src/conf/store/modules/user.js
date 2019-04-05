import _ from 'lodash';

export default {
  state: {
    authInfo: {
    },
    baseInfo: {
    },
  },
  mutations: {
    setUserAuthInfo(state, authInfo) {
      const _state = state;
      _state.authInfo = _.cloneDeep(authInfo);
    },
    mergeUserAuthInfo(state, userAuth) {
      const _state = state;
      const originAuthInfo = state.authInfo;
      _state.authInfo = {
        ...originAuthInfo,
        ..._.cloneDeep(userAuth),
      };
    },
    rmUserAuthInfo(state) {
      const _state = state;
      _state.authInfo = {};
    },
    setUserBaseInfo(state, baseInfo) {
      const _state = state;
      _state.baseInfo = _.cloneDeep(baseInfo);
    },
    mergeUserBaseInfo(state, baseInfo) {
      const _state = state;
      const originBaseInfo = state.baseInfo;
      _state.baseInfo = {
        ...originBaseInfo,
        ..._.cloneDeep(baseInfo),
      };
    },
    rmUserBaseInfo(state) {
      const _state = state;
      _state.baseInfo = {};
    },
  },
};
