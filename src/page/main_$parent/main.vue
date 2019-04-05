<style lang="scss" rel="stylesheet/scss" module>
  .content1 {
    @include _mResponsive('sm-and-up') {
      height: 410px;
    };
  }

  .uerInfo {
    padding: 16px 20px;
    height: 80px;
    margin-bottom: 10px;
    .avatar {
      display: inline-block;
      width: 54px;
      height: 54px;
      border-radius: 27px;
      overflow: hidden;
      img {
        width: 54px;
        height: 54px;
      }
    }
    .text {
      display: inline-block;
      vertical-align: top;
      margin-left: 26px;
      font-size: 18px;
      color: $_text40Color;
    }
    .desc {
      margin-top: 4px;
      font-size: 13px;
      color: $_text20Color;
    }
  }

  .apiAudits {
    height: calc(100% - 90px);
    .costTime {
      position: relative;
      padding-left: 16px;
      &::before {
        content: '·';
        display: inline-block;
        width: 0px;
        height: 0px;
        line-height: 1px;
        position: absolute;
        left: 0px;
        top: 4px;
        font-size: 50px;
      }
      &.error::before {
        color: $_errorColor;
      }
      &.success::before {
        color: $_successColor;
      }
      &.warn::before {
        color: $_warningColor;
      }
    }
  }

  .doing {
    @include _mResponsive('sm-and-down') {
      margin-top: 10px;
    };
    .item {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid rgb(233, 233, 233);
    }
  }

  .content2 {
    margin-top: 10px;
    @include _mResponsive('sm-and-up') {
      height: 260px;
    };
  }

  .active {
    position: relative;
    .footer {
      position: absolute;
      right: 32px;
    }
  }

  .notices {
    @include _mResponsive('sm-and-down') {
      margin-top: 10px;
    };
  }

  .notice {
    padding-bottom: 8px;
    font-size: 12px;
    .item {
      @include _mTextEllipsis();
    }
  }
</style>

<template>
  <hl-page title="工作台">
    <el-row :gutter="10"
      :class="$style.content1">
      <el-col :xs="24"
        :md="16"
        style="height: 100%;">
        <cd-container :class="$style.uerInfo"
          hide-header>
          <div :class="$style.avatar">
            <img src="https://files.cloopm.com/avatar/a3080ab2-296f-4242-b23b-00bc17f980f3.png"
              alt="用户头像">
          </div>
          <div :class="$style.text">
            <p>
              你好,{{ get_(userBaseInfo_, 'userName') }},欢迎回来
            </p>
            <p :class="$style.desc">
              {{ get_(userBaseInfo_, 'roleName') }}
            </p>
          </div>
        </cd-container>
        <cd-panel :class="$style.apiAudits"
          fixed-footer
          fixed-heder
          plain-footer
          title="接口审计信息">
          <cd-table :data="apiAudits"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="userName"
              label="用户名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="requestUri"
              label="uri"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="method"
              label="method"
              width="90">
            </el-table-column>
            <el-table-column
              prop="statusCode"
              label="状态码"
              width="80">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.statusCodeSubject"
                  size="mini"
                  disable-transitions>{{ scope.row.statusCode }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="costTime"
              label="时间消耗"
              width="100">
              <template slot-scope="scope">
                <span :class="[$style.costTime, $style[scope.row.costTimeStatus]]">
                  {{ scope.row.costTime }}
                </span>
              </template>
            </el-table-column>
            <cd-table-column
              prop="requestTime"
              label="请求时间"
              width="160">
            </cd-table-column>
          </cd-table>
          <footer slot="footer"
            style="text-align: right">
            <el-pagination :total="apiAuditTotal"
              :current-page.sync="apiAuditPageIndex"
              :page-size="3"
              layout="prev, pager, next">
            </el-pagination>
          </footer>
        </cd-panel>
      </el-col>
      <el-col :xs="24"
        :md="8"
        style="height: 100%;">
        <cd-panel :class="$style.doing"
          title="进行中的项目"
          style="height: 100%;">
          <el-row :class="$style.item">
            <el-col :span="4"
              style="text-align: center">已解决</el-col>
            <el-col :span="12"
              style="height: 100%; padding-top:26px">
              <el-progress :show-text="false"
                :percentage="70"></el-progress>
            </el-col>
            <el-col :span="8"
              style="text-align: center">
              单数：<cd-text-value style="font-size: 18px">23</cd-text-value>
            </el-col>
          </el-row>
          <el-row :class="$style.item">
            <el-col :span="4"
              style="text-align: center">已关闭</el-col>
            <el-col :span="12"
              style="height: 100%; padding-top:26px">
              <el-progress :show-text="false"
                :percentage="20"
                color="#000"></el-progress>
            </el-col>
            <el-col :span="8"
              style="text-align: center">
              单数：<cd-text-value style="font-size: 18px">18</cd-text-value>
            </el-col>
          </el-row>
        </cd-panel>
      </el-col>
    </el-row>
    <el-row :class="$style.content2"
      :gutter="10">
      <el-col :xs="24"
        :md="14"
        style="height: 100%">
        <cd-panel
          :class="$style.active"
          title="动态"
          fixed-footer
          fixed-heder
          plain-footer
          style="height: 100%">
          <cd-table :data="logs"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="address"
              label="地点"
              width="140">
            </el-table-column>
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
          </cd-table>
          <footer slot="footer"
            style="text-align: right">
            <el-pagination :total="logTotal"
              :current-page.sync="logPageIndex"
              :page-size="4"
              layout="prev, pager, next">
            </el-pagination>
          </footer>
        </cd-panel>
      </el-col>
      <el-col :xs="24"
        :md="10"
        :class="$style.notices"
        style="height: 100%">
        <cd-panel title="公告"
          style="height: 100%"
          fixed-heder>
          <el-row v-for="notice in notices"
            :gutter="3"
            :key="notice.id"
            :class="$style.notice">
            <el-col :class="$style.item"
              :xs="7"
              :md="10">
              <hl-icon type="shengyin"
                style="color: rgb(255, 191, 0);"></hl-icon>
              &nbsp;&nbsp;
              <cd-text-action>{{ notice.title }}</cd-text-action>
            </el-col>
            <el-col :class="$style.item"
              :xs="7"
              :md="7">
              {{ notice.system }}
            </el-col>
            <el-col :class="$style.item"
              :xs="10"
              :md="7"
              style="text-align: right;">
              {{ notice.date }}
            </el-col>
          </el-row>
        </cd-panel>
      </el-col>
    </el-row>
  </hl-page>
</template>
<script>
import {
  HlPage,
  HlIcon,
} from 'comp@';
import {
  apiAuditsApi,
  userApi,
} from 'api@';
import Mock from 'mockjs';
import dayjs from 'dayjs';

export default {
  name: 'MainPage',
  components: {
    HlPage,
    HlIcon,
  },
  withLoading: true,
  data() {
    return {
      apiAudits: [],
      notices: [],
      apiAuditTotal: 0,
      apiAuditPageIndex: 1,
      logs: [],
      logTotal: 0,
      logPageIndex: 1,
    };
  },
  watch: {
    apiAuditPageIndex() {
      this.loadApiAudit();
    },
    logPageIndex() {
      this.loadLog();
    },
  },
  methods: {
    async loadApiAudit$() {
      const apiAuditsSumary = await apiAuditsApi.listApiAudits({}, this.apiAuditPageIndex, 4);
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
      this.apiAuditTotal = apiAuditsSumary.total || 0;
    },
    async loadLog$() {
      const logsSumary = await userApi.listLoginLogs({
        userName: this.get_(this.userBaseInfo_, 'userName'),
      }, this.logPageIndex, 3);
      this.logs = (logsSumary.content || [])
        .map((item) => {
          const _item = item;
          _item.address = item.country + item.province + item.city;
          return _item;
        });
      this.logTotal = logsSumary.total || 0;
    },
  },
  async created() {
    this.notices = Mock.mock({
      'data|10-30': [{
        id: '@id',
        title: '@ctitle(1, 25)',
        'system|1': ['物流云体验-cnpmtest', 'cbpm系统'],
        date: '@date("yyyy-MM-dd hh:mm:ss")',
      }],
    }).data;
    await this.loadApiAudit();
    await this.loadLog();
  },
};
</script>
