<style lang="scss" rel="stylesheet/scss" module>
.row {
  margin-top: 24px;
  word-wrap: break-word;
}
</style>
<template>
  <cd-drawer v-model="self$.visible"
    width="600px">
    <cd-title
      :fill="false"
      :full="false">
      {{ audit.requestUri }}
      <el-tag
        :type="audit.statusCodeSubject"
        size="mini"
        disable-transitions>{{ audit.statusCode }}</el-tag>
    </cd-title>
    <cd-text-kv :class="$style.row"
      label="发起请求用户:"
      value-bold
      block>
      {{ audit.userName }}
    </cd-text-kv>
    <cd-text-kv :class="$style.row"
      label="method:"
      value-bold
      block>
      {{ audit.method }}
    </cd-text-kv>
    <cd-text-kv :class="$style.row"
      label="时间消耗:"
      value-bold
      block>
      {{ audit.costTime }}
    </cd-text-kv>
    <cd-text-kv :class="$style.row"
      label="content type:"
      value-bold
      block>
      {{ audit.contentType }}
    </cd-text-kv>
    <cd-text-kv :class="$style.row"
      label="请求时间:"
      value-bold
      block>
      {{ audit.requestTime }}
    </cd-text-kv>
    <cd-text-kv :class="$style.row"
      label="请求时间:"
      value-bold
      block>
      {{ audit.requestTime }}
    </cd-text-kv>
    <cd-text-kv :class="$style.row"
      :inline="false"
      label="查询参数:"
      value-bold
      block>
      {{ audit.queryParams }}
    </cd-text-kv>
    <cd-text-kv :class="$style.row"
      :inline="false"
      label="请求体:"
      value-bold
      block>
      {{ audit.requestBody }}
    </cd-text-kv>
    <cd-text-kv :class="$style.row"
      :inline="false"
      label="响应体:"
      value-bold
      block>
      {{ audit.responseBody }}
    </cd-text-kv>
  </cd-drawer>
</template>
<script>
import {
  DoubleBind,
} from '@candy/ui/mixin';

export default {
  name: 'MainParent_ApiAudit_DetailMD',
  components: {
  },
  mixins: [DoubleBind],
  doubleBind: ['visible'],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    audit: Object,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    cancel() {
      this.self$.visible = false;
    },
  },
  created() {
  },
};
</script>
