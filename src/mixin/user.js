import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      userAuthInfo_: state => state.user.authInfo,
      userBaseInfo_: state => state.user.baseInfo,
    }),
  },
  methods: {
  },
};
