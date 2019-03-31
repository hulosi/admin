const prefix = process.env.VUE_APP_APP_NAME ? `/${process.env.VUE_APP_APP_NAME}` : '';

export default {
  state: {
    list: [{
      id: '1',
      text: '工作台',
      icon: 'menu-shouye',
      router: `${prefix}/`,
    }, {
      id: '2',
      text: '登录模板',
      icon: 'menu-denglu',
      childs: [{
        id: '3',
        text: '登录',
        router: `${prefix}/login`,
      }, {
        id: '4',
        text: '登录模板1',
        router: `${prefix}/login1`,
      }, {
        id: '5',
        text: '登录模板2',
        router: `${prefix}/login2`,
      }],
    }, {
      id: '6',
      text: '成员管理',
      icon: 'menu-yonghuguanli',
      childs: [{
        id: '8',
        text: '成员列表',
        router: `${prefix}/user`,
      }, {
        id: '9',
        text: '成员列表modal',
        router: `${prefix}/user/modal`,
      }, {
        id: '10',
        text: '成员列表drawer',
        router: `${prefix}/user/drawer`,
      }, {
        id: '11',
        text: '成员列表tab',
        router: `${prefix}/user/tab`,
      }],
    }],
    collapse: false,
  },
  mutations: {
    setCollapse(state, collapse) {
      const _state = state;
      _state.collapse = collapse;
    },
  },
};
