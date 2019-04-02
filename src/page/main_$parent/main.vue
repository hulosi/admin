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

  .todo {
    height: calc(100% - 90px);
    position: relative;
    .footer {
      position: absolute;
      right: 32px;
    }
    .priority {
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
        color: $_errorColor;
        font-size: 50px;
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
  <cb-page title="工作台">
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
              你好,{{ get_(userBaseInfo_, 'name') }},欢迎回来
            </p>
            <p :class="$style.desc">
              管理员/服务管理员
            </p>
          </div>
        </cd-container>
        <cd-panel :class="$style.todo"
          fixed-footer
          plain-footer
          title="待办事项">
          <cd-table :data="todoList"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="编号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="subject"
              label="主题">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="80">
              <template slot-scope="scope">
                <el-tag
                  type="warning"
                  size="mini"
                  disable-transitions>{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="submiter"
              label="提单人"
              width="90">
            </el-table-column>
            <el-table-column
              prop="priority"
              label="优先级"
              width="80">
              <template slot-scope="scope">
                <span :class="$style.priority">
                  {{ scope.row.priority }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="updateDateTime"
              label="更新时间"
              width="140">
            </el-table-column>
          </cd-table>
          <footer slot="footer"
            style="text-align: right">
            <el-pagination :total="50"
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
          style="height: 100%">
          暂无数据
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
              <cb-icon type="shengyin"
                style="color: rgb(255, 191, 0);"></cb-icon>
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
  </cb-page>
</template>
<script>
import {
  CbPage,
  CbIcon,
} from 'comp@';
import Mock from 'mockjs';

export default {
  name: 'MainPage',
  components: {
    CbPage,
    CbIcon,
  },
  data() {
    return {
      todoList: [{
        id: 'cpm190220001',
        subject: 'OA模块登入问题',
        status: '处理中',
        submiter: '吴提单',
        priority: '紧急',
        updateDateTime: '2019-03-13 10:16:48',
      }],
      notices: [],
    };
  },
  created() {
    this.notices = Mock.mock({
      'data|10-30': [{
        id: '@id',
        title: '@ctitle(1, 25)',
        'system|1': ['物流云体验-cnpmtest', 'cbpm系统'],
        date: '@date("yyyy-MM-dd hh:mm:ss")',
      }],
    }).data;
  },
};
</script>
