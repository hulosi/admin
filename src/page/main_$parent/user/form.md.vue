<style lang="scss" rel="stylesheet/scss" module>
.page {
}
</style>
<template>
  <el-form ref="form"
      :model="user"
      label-width="80px">
    <cd-panel hide-header>
      <div :class="$style.baseInfoForm">
        <el-form-item label="真实姓名">
          <el-input v-model="user.name" placeholder="你叫什么名字呢?"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="user.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker v-model="user.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker v-model="user.date2"
              placeholder="选择时间"
              style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="user.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="user.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="user.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="user.desc"></el-input>
        </el-form-item>
      </div>
    </cd-panel>
  </el-form>
</template>
<script>
import {
  CbPage,
} from 'comp@';

export default {
  name: 'MainParent_User_FormMd',
  components: {
    CbPage,
  },
  props: {
    user: Object,
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
