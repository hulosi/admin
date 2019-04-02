<style lang="scss" rel="stylesheet/scss" module>
.page {
}
</style>
<template>
<cb-page :class="$style.page"
  :title="user.userName"
  show-back>
  <md-detail :user="user"
    @update="update"></md-detail>
</cb-page>
</template>
<script>
import {
  CbPage,
} from 'comp@';
import MdDetail from './detail.md.vue';
import data from './data';

export default {
  name: 'MainParent_User_UserId',
  components: {
    CbPage,
    MdDetail,
  },
  data() {
    return {
      id: '',
      user: {},
    };
  },
  computed: {
  },
  methods: {
    update() {
      this.push_(`/user/${this.id}/edit`);
    },
  },
  created() {
    this.id = this.getParam_('id');
    this.user = data.getUser(this.id) || {};
    if (!this.user) {
      this.back_();
    }
  },
};
</script>
