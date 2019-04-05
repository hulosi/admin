import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      userAuthInfo_: state => state.user.authInfo,
      userBaseInfo_: state => state.user.baseInfo,
    }),
  },
  methods: {
    /**
     * 设置用户权限信息
     */
    setUserAuthInfo_(authInfo) {
      this.$store.commit('setUserAuthInfo', authInfo);
    },
    clearUserAuthInfo_() {
      this.$store.commit('rmUserAuthInfo');
    },
    /**
     * 设置用户基础信息
     */
    setUserBaseInfo_(baseInfo) {
      this.$store.commit('setUserBaseInfo', baseInfo);
    },
    clearUserBaseInfo_() {
      this.$store.commit('rmUserBaseInfo');
    },
  },
};
