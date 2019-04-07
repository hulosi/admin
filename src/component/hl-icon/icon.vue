<style lang="scss" rel="stylesheet/scss" module>
</style>
<template>
  <cd-icon v-bind="$attrs"
    :url="url"
    :prefix="prefix"
    v-on="$listeners"></cd-icon>
</template>
<script>
export default {
  name: 'HlIcon',
  componentName: 'HlIcon',
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
      url: '//at.alicdn.com/t/font_1102612_ycfmo3zzjr.js',
      prefix: 'hulo-icon',
    };
  },
  computed: {
  },
  methods: {
  },
  created() {
  },
  mounted() {
  },
};
</script>
