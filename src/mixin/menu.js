import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      menuList_: state => state.menu.list,
    }),
  },
  methods: {
    /**
     * 设置目录列表
     * @param {Array} menuList 目录列表
     */
    setMenuList_(menuList) {
      this.$store.commit('setMenuList', menuList);
    },
    /**
     * 清空目录列表
     */
    clearMenuList_() {
      this.$store.commit('rmMenuList');
    },
  },
};
