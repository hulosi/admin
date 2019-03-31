<style lang="scss" rel="stylesheet/scss" module>
.page {
}
</style>
<template>
<cb-page :class="$style.page" title="成员管理">
  <template slot="header-inner">
    <div>
      <cd-button size="mini"
        type="primary"
        style="transform: translateY(-3px);">
        <cb-icon type="tianjia"></cb-icon>
        &nbsp;&nbsp;
        创建成员
      </cd-button>
    </div>
  </template>
  <md-list></md-list>
</cb-page>
</template>
<script>
import {
  CbPage,
  CbIcon,
} from 'comp@';
import MdList from './list.md.vue';

export default {
  name: 'MainParent_User_User',
  components: {
    CbPage,
    CbIcon,
    MdList,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  created() {
  },
};
</script>
