<style lang="scss" rel="stylesheet/scss" module>
.page {
}
</style>
<template>
  <hl-page :class="$style.page"
    title="接口统计">
    <cd-panel :class="$style.list"
      hide-header>
      <cd-table :data="apiAudits"
        size="mini"
        style="width: 100%"
        row-key="auditId">
        <cd-table-column
          prop="requestUri"
          label="uri"
          show-overflow-tooltip>
        </cd-table-column>
        <cd-table-column
          prop="userName"
          label="用户名"
          width="120">
        </cd-table-column>
        <cd-table-column
          prop="method"
          label="method"
          width="90">
        </cd-table-column>
        <cd-table-column
          prop="statusCode"
          label="状态码"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.statusCodeSubject"
              size="mini"
              disable-transitions>{{ scope.row.statusCode }}</el-tag>
          </template>
        </cd-table-column>
        <cd-table-column
          prop="costTime"
          label="时间消耗"
          width="100">
          <template slot-scope="scope">
            <span :class="[$style.costTime, $style[scope.row.costTimeStatus]]">
              {{ scope.row.costTime }}
            </span>
          </template>
        </cd-table-column>
        <cd-table-column
          prop="contentType"
          label="content type"
          width="140"
          show-overflow-tooltip>
        </cd-table-column>
        <cd-table-column
          prop="requestTime"
          label="请求时间"
          width="160">
        </cd-table-column>
        <cd-table-column
          label="操作"
          width="80"
          fixed="right">
          <template slot-scope="scope">
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
    <md-detail :visible.sync="detailVisible"
      :audit="currentAudit"></md-detail>
  </hl-page>
</template>
<script>
import {
  HlPage,
  HlIcon,
  HlStatusText,
} from 'comp@';
import {
  apiAuditsApi,
} from 'api@';
import dayjs from 'dayjs';
import MdDetail from './detail.md.vue';

export default {
  name: 'MainParent_Sys_ApiAudit_ApiAudit',
  title$: '接口审计',
  components: {
    HlPage,
    HlIcon,
    HlStatusText,
    MdDetail,
  },
  withLoading: true,
  data() {
    return {
      apiAudits: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      currentAudit: {},
      detailVisible: false,
    };
  },
  computed: {
  },
  methods: {
    async loadData$() {
      const apiAuditsSumary = await apiAuditsApi
        .listApiAudits({}, this.pageIndex, this.pageSize);
      this.apiAudits = (apiAuditsSumary.content || []).map((item) => {
        const _item = item;
        if (Number.isSafeInteger(_item.requestTime)) {
          _item.requestTime = dayjs(_item.requestTime).format('YY-MM-DD HH:mm:ss');
        }
        if (_item.costTime > 500) {
          _item.costTimeStatus = 'warn';
        } else if (_item.costTime > 1e3) {
          _item.costTimeStatus = 'error';
        } else {
          _item.costTimeStatus = 'success';
        }
        _item.statusCodeSubject = _item.statusCode === 200 ? 'success' : 'danger';
        return _item;
      });
      this.total = apiAuditsSumary.total;
    },
    detail(audit) {
      this.currentAudit = audit;
      this.detailVisible = true;
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
