<style lang="scss" rel="stylesheet/scss" module>
</style>
<template>
  <cd-icon v-bind="$attrs" v-on="$listeners"
    :url="url" :prefix="prefix"></cd-icon>
</template>
<script>
export default {
  name: 'CbIcon',
  componentName: 'CbIcon',
  components: {
  },
  mixins: [],
  inheritAttrs: false,
  props: {
    src: String,
    alt: String,
    paddingTop: String,
  },
  data() {
    return {
      url: '//at.alicdn.com/t/font_1102135_zmc2ote3ev.js',
      prefix: 'cb-icon',
    };
  },
  computed: {
  },
  methods: {
    show() {
      this.$refs.preview.show();
    },
  },
  created() {
  },
  mounted() {
  },
};
</script>
