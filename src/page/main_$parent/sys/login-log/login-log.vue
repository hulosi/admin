<style lang="scss" rel="stylesheet/scss" module>
.page {
}
</style>
<template>
  <hl-page :class="$style.page"
    title="接口统计">
    <cd-panel :class="$style.list"
      hide-header>
      <el-table :data="logs"
        size="mini"
        style="width: 100%">
        <cd-table-column
          prop="address"
          label="地点"
          width="180"
          show-overflow-tooltip>
        </cd-table-column>
        <cd-table-column
          prop="userName"
          label="用户名"
          width="140"
          show-overflow-tooltip>
        </cd-table-column>
        <cd-table-column
          prop="lastName"
          label="姓名"
          width="140"
          show-overflow-tooltip>
        </cd-table-column>
        <cd-table-column
          prop="ipAddress"
          label="ip地址"
          width="120">
        </cd-table-column>
        <cd-table-column
          prop="userAgent"
          label="客户端"
          show-overflow-tooltip>
        </cd-table-column>
        <cd-table-column
          prop="loginTime"
          label="登录时间"
          width="150">
        </cd-table-column>
      </el-table>
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
  name: 'MainParent_Sys_LoginLog_LoginLog',
  title$: '登录日志',
  components: {
    HlPage,
    HlIcon,
    HlStatusText,
  },
  withLoading: true,
  data() {
    return {
      logs: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  computed: {
  },
  methods: {
    async loadData$() {
      const logsSumary = await userApi.listLoginLogs({}, this.pageIndex, this.pageSize);
      this.logs = (logsSumary.content || [])
        .map((item) => {
          const _item = item;
          _item.address = item.country + item.province + item.city;
          return _item;
        });
      this.logTotal = logsSumary.total || 0;
      this.total = logsSumary.total;
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
