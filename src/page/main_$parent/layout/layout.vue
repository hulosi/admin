<style lang="scss" rel="stylesheet/scss" module>
  @import './common/var.scss';

  .pageEnterActive, .pageLeaveActive {
    transition: all .1s;
  }

  .pageEnter, .pageLeaveActive {
    opacity: 0;
    transform: translateY(30px);
  }

  .layout {
    width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    background-color: $siderColor;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: $_mainBgColor;
    max-width: calc(100% - #{$siderWidth});
    @include _mResponsive('sm-and-down') {
      max-width: 100%;
    };
    &.menuCollapse {
      max-width: calc(100% - 64px);
    }
  }
</style>

<template>
  <div :class="$style.layout">
    <md-sider ref="sider"
      class="hidden-sm-and-down hidden-sm-only"></md-sider>
    <div
      :style="{
        maxWidth: `calc(100% - ${siderWidth}px)`
      }"
      :class="$style.content">
      <md-navbar></md-navbar>
      <transition
        :enter-class="$style.pageEnter"
        :enter-active-class="$style.pageEnterActive"
        :leave-active-class="$style.pageLeaveActive"
        mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import u from '@candy/utils';
import { mapState } from 'vuex';
import MdSider from './sider/sider.vue';
import MdNavbar from './navbar/navbar.vue';

export default {
  name: 'Layout',
  components: {
    MdSider,
    MdNavbar,
  },
  data() {
    return {
      visible: false,
      visiblePwd: false,
      userInfoData: {},
      siderWidth: Number.parseFloat(this.$style.varSiderWidth),
    };
  },
  computed: {
    ...mapState({
      collapse: state => state.menu.collapse,
    }),
  },
  watch: {
    collapse(val) {
      if (val) {
        const cancel = u.bom.animationFrameLoop(() => {
          this.resetSiderWidth();
          if (this.siderWidth <= 64) {
            cancel();
          }
        });
      } else {
        const cancel = u.bom.animationFrameLoop(() => {
          this.resetSiderWidth();
          if (this.siderWidth >= 240) {
            cancel();
          }
        });
      }
    },
  },
  methods: {
    resetSiderWidth() {
      this.siderWidth = u.dom.size(this.$refs.sider.$el).width;
    },
  },
  mounted() {
    this.resetSiderWidth();
    window.addEventListener('resize', this.resetSiderWidth);
  },
  destroyed() {
    window.removeEventListener('resize', this.resetSiderWidth);
  },
};
</script>
