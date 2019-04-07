<style lang="scss" rel="stylesheet/scss" module>
.page {
}
</style>
<template>
  <hl-page :class="$style.page"
    title="用户管理">
    <template slot="header-inner">
      <div>
        <cd-button size="mini"
          type="primary"
          style="transform: translateY(-3px);"
          @click="add">
          <hl-icon type="tianjia"></hl-icon>
          &nbsp;&nbsp;
          创建用户
        </cd-button>
      </div>
    </template>
    <cd-panel :class="$style.list"
      hide-header>
      <cd-table :data="users">
        <cd-table-column
          prop="lastName"
          label="实际名"
          show-overflow-tooltip
          width="120"></cd-table-column>
        <cd-table-column
          prop="userName"
          label="用户名"
          show-overflow-tooltip
          width="140"></cd-table-column>
        <cd-table-column
          prop="roleName"
          label="角色"
          width="120"
          show-overflow-tooltip></cd-table-column>
        <cd-table-column
          prop="mobile"
          label="手机"
          width="100"></cd-table-column>
        <cd-table-column
          prop="email"
          label="邮箱"
          show-overflow-tooltip></cd-table-column>
        <cd-table-column
          prop="enabled"
          label="启用"
          width="80">
          <template slot-scope="scope">
            <hl-status-text :color=" scope.row.status ? 'success' : 'disable'">
              {{ scope.row.status ? '启用' : '失效' }}
            </hl-status-text>
          </template>
        </cd-table-column>
        <cd-table-column
          label="操作"
          width="120"
          fixed="right">
          <template slot-scope="scope">
            <cd-text-action @click="update(scope.row)">修改</cd-text-action>
            &nbsp;
            <cd-text-action @click="detail(scope.row)">详情</cd-text-action>
          </template>
        </cd-table-column>
      </cd-table>
      <div style="text-align: right; margin-top:16px;">
        <el-pagination
          :current-page.sync="pageIndex"
          :page-sizes="[10, 15, 25, 40]"
          :page-size.sync="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="loadData"
          @current-change="loadData">
        </el-pagination>
      </div>
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

export default {
  name: 'MainParent_User_User',
  components: {
    HlPage,
    HlIcon,
    HlStatusText,
  },
  withLoading: true,
  data() {
    return {
      users: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  computed: {
  },
  methods: {
    async loadData$() {
      const usersSumary = await userApi.paging({}, this.pageIndex, this.pageSize);
      this.users = (usersSumary.content || []);
      this.total = usersSumary.total;
    },
    update(user) {
      this.push_(`/sys/user/${user.userId}/edit`);
    },
    detail(user) {
      this.push_(`/sys/user/detail/${user.userId}`);
    },
    add() {
      this.push_('/sys/user/add/edit');
    },
  },
  created() {
    this.loadData();
  },
};
</script>
