<style lang="scss" rel="stylesheet/scss" module>
@import "../common/var.scss";

.sider {
  z-index: 10;
  background-color: $siderColor;
  box-shadow: rgba(0, 21, 41, 0.45) 1px 0px 3px;
  .siderInner {
    position: relative;
    padding-top: 48px;
    overflow: hidden;
  }
}

.logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  line-height: 48px;
  padding-left: 18px;
  background-color: lighten($siderColor, 10%);
  .img {
    height: 24px;
    vertical-align: middle;
  }
  .title {
    font-size: 16px;
    color: #fff;
    margin-left: 18px;
  }
}
</style>
<template>
<div :class="$style.sider">
  <div :class="$style.siderInner">
    <div :class="$style.logo">
      <img src="./logo.png" alt="logo" :class="$style.img"/>
      <span :class="$style.title">
        CBPM&nbsp;易捷云
      </span>
    </div>
    <md-menu></md-menu>
  </div>
</div>
</template>
<script>
import MdMenu from '../common/menu.vue';

export default {
  name: 'MainParentLayoutSiderSider',
  components: {
    MdMenu,
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {
  },
  created() {
  },
};
</script>
