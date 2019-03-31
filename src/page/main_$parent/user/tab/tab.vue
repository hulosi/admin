<style lang="scss" rel="stylesheet/scss" module>
.page {
}
</style>
<template>
<cb-page :class="$style.page"
  hide-header>
  <el-tabs type="border-card">
    <el-tab-pane
      label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理"
      closable>配置管理</el-tab-pane>
    <el-tab-pane label="角色管理"
      closable>角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿"
      closable>定时任务补偿</el-tab-pane>
  </el-tabs>
</cb-page>
</template>
<script>
import {
  CbPage,
} from 'comp@';

export default {
  name: '你的组件',
  components: {
    CbPage,
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
