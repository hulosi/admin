<style lang="scss" rel="stylesheet/scss" module>
.header {
  padding: 0 18px;
  width: 100%;
  height: 64px;
  line-height: 64px;
  background-color: #fff;
  .headerInner {
    margin-left: 128px;
    display: inline-block;
    vertical-align: middle;
  }
}

.title {
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  color: $_titleColor;
}

.inner {
  padding: $_pageSpace;
  max-width: 100%;
}

.back {
  margin-right: 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
<template>
  <cd-page v-bind="$attrs"
    v-on="$listeners">
    <slot v-if="!hideHeader"
      name="header">
      <div :class="$style.header">
        <hl-icon v-if="showBack"
          :class="$style.back"
          type="fanhui"
          @click.native="back()"></hl-icon>
        <span v-if="title"
          :class="$style.title">{{ title }}</span>
        <div :class="$style.headerInner">
          <slot name="header-inner"></slot>
        </div>
      </div>
    </slot>
    <div :class="innerCls">
      <slot></slot>
    </div>
  </cd-page>
</template>
<script>
import {
  HlIcon,
} from 'comp@';

export default {
  name: 'HlPage',
  componentName: 'HlPage',
  components: {
    HlIcon,
  },
  mixins: [],
  inheritAttrs: false,
  props: {
    hideHeader: Boolean,
    title: String,
    innerClass: String,
    showBack: Boolean,
  },
  data() {
    return {
    };
  },
  computed: {
    innerCls() {
      return this.innerClass ? [this.$style.inner].concat(this.innerClass) : [this.$style.inner];
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  created() {
  },
  mounted() {
  },
};
</script>
