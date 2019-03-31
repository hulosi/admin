<style lang="scss" rel="stylesheet/scss" module>
.updateButton {
  float: right;
}

.row {
  margin-top: 32px;
}

.block {
  margin-top: 64px;
}

.avatar {
  width: 240px;
  height: 240px;
  border-radius: 120px;
  overflow: hidden;
  margin: auto;
  box-shadow: $_elevation10;
}

.companyLogo {
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: $_elevation10;
  margin: auto;
}
</style>
<template>
<cd-panel hide-header>
  <cd-title :full="false"
    line
    bottom-line
    style="margin-top: -14px;"
    :class="$style.title">
    登录信息
    <el-button :class="$style.updateButton"
      type="primary"
      size="mini"
      @click="update">修改</el-button>
  </cd-title>
  <cd-container>
    <el-row :gutter="16"
      :class="$style.row">
      <el-col :xs="24" :md="12">
        <cd-text-kv label="用户名:" value-bold>
          {{ user.userName }}
        </cd-text-kv>
      </el-col>
      <el-col :xs="24" :md="12">
        <cd-text-kv label="系统角色:" value-bold>
          {{ user.role }}
        </cd-text-kv>
      </el-col>
    </el-row>
    <el-row :class="$style.row">
      <el-col :span="24">
        <cd-text-kv label="上次登录时间:">
          {{ user.lastLoginTime }}
        </cd-text-kv>
      </el-col>
    </el-row>
  </cd-container>

  <cd-title :full="false"
    line
    bottom-line
    :class="$style.block">
    基本信息
  </cd-title>
  <cd-container
    :gutter="16"
    row
    style="padding-top: 32px;">
    <el-col :xs="24" :md="8">
      <div :class="$style.avatar">
        <cd-gallery :img="user.avatar"
          width="240px"
          height="240px">
        </cd-gallery>
      </div>
      &nbsp;
    </el-col>
    <el-col :xs="24" :md="16">
      <el-row :gutter="16" :class="$style.row">
        <el-col :xs="24" :md="12">
          <cd-text-kv label="真实姓名:" value-bold>
            {{ user.name }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24" :md="12">
          <cd-text-kv value-bold label="性别:">
            {{ user.sex }}
          </cd-text-kv>
        </el-col>
      </el-row>
      <el-row :gutter="16" :class="$style.row">
        <el-col :xs="24" :md="12">
          <cd-text-kv label="联系电话:" value-bold>
            {{ user.phone }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24" :md="12">
          <cd-text-kv value-bold label="邮箱:">
            {{ user.email }}
          </cd-text-kv>
        </el-col>
      </el-row>
      <el-row :gutter="16" :class="$style.row">
        <el-col :xs="24" :md="8">
          <cd-text-kv label="国籍:" value-bold>
            {{ user.nationality }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24" :md="8">
          <cd-text-kv value-bold label="籍贯:">
            {{ user.nativePlace }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24" :md="8">
          <cd-text-kv value-bold label="民族:">
            {{ user.nation }}
          </cd-text-kv>
        </el-col>
      </el-row>
      <el-row :class="$style.row">
        <cd-text-kv value-bold label="住址:">
          {{ user.address }}
        </cd-text-kv>
      </el-row>
    </el-col>
  </cd-container>

  <cd-title :full="false"
    line
    bottom-line
    :class="$style.block">
    公司信息
  </cd-title>
  <cd-container
    :gutter="16"
    row
    style="padding-top: 32px;">
    <el-col :xs="24" :md="8">
      <div :class="$style.companyLogo">
        <cd-gallery :img="user.companyUrl"
          width="300px"
          height="165px">
        </cd-gallery>
      </div>
      &nbsp;
    </el-col>
    <el-col :xs="24" :md="16">
      <el-row :gutter="16" :class="$style.row">
        <el-col :xs="24" :md="12">
          <cd-text-kv label="公司名字:" value-bold>
            {{ user.company }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24" :md="12">
          <cd-text-kv value-bold label="工号:">
            {{ user.jobId }}
          </cd-text-kv>
        </el-col>
      </el-row>
      <el-row :gutter="16" :class="$style.row">
        <el-col :xs="24" :md="12">
          <cd-text-kv label="部门:" value-bold>
            {{ user.department }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24" :md="12">
          <cd-text-kv value-bold label="职务:">
            {{ user.duties }}
          </cd-text-kv>
        </el-col>
      </el-row>
      <el-row :class="$style.row">
        <el-col :span="24">
          <cd-text-kv value-bold label="工作地点:">
            {{ user.workspace }}
          </cd-text-kv>
        </el-col>
      </el-row>
    </el-col>
  </cd-container>
</cd-panel>
</template>
<script>

export default {
  name: 'MainParent_User_DetailMd',
  components: {
  },
  props: {
    user: Object,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    update() {
      this.$emit('update');
    },
  },
  created() {
  },
};
</script>
