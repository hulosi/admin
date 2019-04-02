<style lang="scss" rel="stylesheet/scss" module>
.page {
}
</style>
<template>
<cb-page :class="$style.page"
  show-back
  :title="user.userName">
  <md-form :user="user">
  </md-form>
</cb-page>
</template>
<script>
import {
  CbPage,
} from 'comp@';
import data from './data';
import MdForm from './form.md.vue';

export default {
  name: 'MainParent_User_UserId_Edit',
  components: {
    CbPage,
    MdForm,
  },
  data() {
    return {
      user: {},
    };
  },
  computed: {
  },
  methods: {
    onSubmit() {
    },
  },
  created() {
    const id = this.getParam_('id');
    this.user = data.getUser(id) || {};
    if (!this.user) {
      this.back_();
    }
  },
};
</script>
