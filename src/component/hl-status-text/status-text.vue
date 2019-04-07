<style lang="scss" rel="stylesheet/scss" module>
@import '~@candy/ui/asset/export/color.scss';

.status {
}
.dot {
}
</style>
<template>
  <span :class="$style.status">
    <hl-icon :style="sty"
      type="status-point"></hl-icon>
    <slot></slot>
  </span>
</template>
<script>
import _ from 'lodash';
import HlIcon from '../hl-icon';

let colorVars = {};

export default {
  name: 'HlStatusText',
  componentName: 'HlStatusText',
  components: {
    HlIcon,
  },
  mixins: [],
  inheritAttrs: false,
  props: {
    color: String,
  },
  data() {
    return {
    };
  },
  computed: {
    sty() {
      const style = {};
      if (this.color) {
        style.color = colorVars[this.color] ? colorVars[this.color] : this.color;
      }
      return style;
    },
  },
  methods: {
  },
  created() {
    colorVars = Object.keys(this.$style)
      .filter(key => _.startsWith(key, 'varText') && _.endsWith(key, 'Color'))
      .reduce((map, key) => {
        const _map = map;
        const nKey = _.camelCase(key.slice(3, -5));
        _map[nKey] = this.$style[key];
        return _map;
      }, {
        title: this.$style.varTitleColor,
        primary: this.$style.varPrimaryColor,
        secondary: this.$style.varSecondaryColor,
        success: this.$style.varSuccessColor,
        warning: this.$style.varWarningColor,
        error: this.$style.varErrorColor,
        important: this.$style.varImportantColor,
        action: this.$style.varActionColor,
        disable: this.$style.varDisableColor,
        money: this.$style.varMoneyColor,
      });
  },
};
</script>
