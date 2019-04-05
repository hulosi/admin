import _ from 'lodash';

export default {
  state: {
    list: [],
    collapse: false,
  },
  mutations: {
    setCollapse(state, collapse) {
      const _state = state;
      _state.collapse = collapse;
    },
    setMenuList(state, menuList) {
      const _state = state;
      const menus = _.cloneDeep(menuList || [])
        .map((item) => {
          const _item = item;
          if (_item.menuName === '应用开发员') {
            _item.route = `${process.env.BASE_URL}sys`;
          }
          _item.subMenus = (_item.subMenus || []).map((subMenu) => {
            const _subMenu = subMenu;
            if (_subMenu.menuName === '角色管理') {
              _subMenu.route = `${process.env.BASE_URL}sys/role`;
            } else if (_subMenu.menuName === '用户管理') {
              _subMenu.route = `${process.env.BASE_URL}sys/user`;
            } else if (_subMenu.menuName === '功能管理') {
              _subMenu.route = `${process.env.BASE_URL}sys/function`;
            } else if (_subMenu.menuName === '权限管理') {
              _subMenu.route = `${process.env.BASE_URL}sys/auth`;
            } else if (_subMenu.menuName === '配置管理') {
              _subMenu.route = `${process.env.BASE_URL}sys/profileCategorie`;
            } else {
              _item.route = `${process.env.BASE_URL}${Math.random()}`;
            }
            return _subMenu;
          });
          return _item;
        });
      menus.unshift({
        menuName: '工作台',
        icon: 'home',
        route: `${process.env.BASE_URL}`,
      });
      _state.list = menus;
    },
    rmMenuList(state) {
      const _state = state;
      _state.list = [];
    },
  },
};
