<style lang="scss" rel="stylesheet/scss" module>
.page {
  :global(.el-row) {
    margin-top: -16px;
    :global(.el-col) {
      margin-top: 24px;
    }
  }
}

.title {
  margin-top: 8px;
}
</style>
<template>
  <hl-page :class="$style.page"
    :title="userName"
    show-back>
    <cd-panel line>
      <div slot="header">
        系统信息
        <div style="float: right;">
          <hl-status-text
            :color=" user.status ? 'success' : 'disable'"
            style="margin-top: 12px;margin-right: 16px;">
            {{ user.status ? '启用' : '失效' }}
          </hl-status-text>
          <el-button :class="$style.updateButton"
            type="primary"
            size="mini"
            @click="update">修改</el-button>
        </div>
      </div>
      <el-row :gutter="16"
        :class="$style.row">
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="账户:"
            value-bold>
            {{ user.userName }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="系统角色:"
            value-bold>
            {{ user.roleName }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="创建时间:"
            value-bold>
            {{ user.entryDate }}
          </cd-text-kv>
        </el-col>
      </el-row>
    </cd-panel>
    <cd-panel title="联系信息"
      line
      style="margin-top: 16px;">
      <el-row :gutter="16"
        :class="$style.row">
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="手机:"
            value-bold>
            {{ user.mobile }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="邮箱:"
            value-bold>
            {{ user.email }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="电话:"
            value-bold>
            {{ user.tel }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="微信:"
            value-bold>
            {{ user.weixin }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="qq:"
            value-bold>
            {{ user.qq }}
          </cd-text-kv>
        </el-col>
      </el-row>
    </cd-panel>
    <cd-panel title="个人信息"
      line
      style="margin-top: 16px;">
      <el-row :gutter="16"
        :class="$style.row">
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="实际名:"
            value-bold>
            {{ user.lastName }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="性别:"
            value-bold>
            {{ user.sex }}
          </cd-text-kv>
        </el-col>
        <el-col :xs="24"
          :sm="12"
          :md="8">
          <cd-text-kv label="生日:"
            value-bold>
            {{ user.birthDay }}
          </cd-text-kv>
        </el-col>
      </el-row>
    </cd-panel>
  </hl-page>
</template>
<script>
import {
  HlPage,
  HlIcon,
  HlStatusText,
} from 'comp@';
import {
  userApi,
} from 'api@';
// import _ from 'lodash';

export default {
  name: 'MainParent_Sys_User_DetailId',
  components: {
    HlPage,
    HlIcon,
    HlStatusText,
  },
  withLoading: true,
  data() {
    return {
      user: {},
    };
  },
  computed: {
    userName() {
      return this.get_(this.user, 'lastName') || this.get_(this.user, 'userName');
    },
  },
  methods: {
    async loadData$() {
      const user = await userApi.get(this.getParam_('id'));
      user.sex = user.gender === 'M' ? '男' : '女';
      this.user = user;
    },
    update() {
    },
  },
  created() {
    this.loadData();
  },
};
</script>
