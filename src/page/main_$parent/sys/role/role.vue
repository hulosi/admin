<style lang="scss" rel="stylesheet/scss" module>
.list {
  .search {
    :global(.el-input-group__prepend) {
      background-color: #fff;
    }
    :global(.el-select) :global(.el-input) {
      width: 100px;
    }
  }
}
.header {
  @include _mClear();
}
</style>
<template>
  <hl-page :class="$style.page"
    title="权限管理">
    <template slot="header-inner">
      <div>
        <cd-button size="mini"
          type="primary"
          style="transform: translateY(-3px);"
          @click="add">
          <hl-icon type="tianjia"></hl-icon>
          &nbsp;&nbsp;
          创建权限
        </cd-button>
      </div>
    </template>
    <cd-panel :class="$style.list">
      <header slot="header"
        :class="$style.header">
        <el-form style="float: right; max-width: 500px; width: 100%;"
          @submit="loadData">
          <el-input v-model="query.search"
            :class="$style.search"
            placeholder="请输入内容"
            size="medium">
            <el-select slot="prepend"
              v-model="query.type"
              placeholder="请选择">
              <el-option label="角色编码"
                value="roleCode"></el-option>
              <el-option label="角色名"
                value="roleName"></el-option>
            </el-select>
            <el-button slot="append"
              icon="el-icon-search"
              @click="loadData"></el-button>
          </el-input>
        </el-form>
      </header>
      <cd-table :data="roles">
        <cd-table-column
          prop="roleId"
          label="编号"
          show-overflow-tooltip
          width="120"></cd-table-column>
        <cd-table-column
          prop="roleCode"
          label="编码"
          show-overflow-tooltip
          width="80"></cd-table-column>
        <cd-table-column
          prop="roleName"
          label="角色名"
          show-overflow-tooltip></cd-table-column>
        <cd-table-column
          prop="enabled"
          label="启用"
          width="80">
          <template slot-scope="scope">
            <hl-status-text :color=" scope.row.enabled ? 'success' : 'disable'">
              {{ scope.row.enabled ? '启用' : '失效' }}
            </hl-status-text>
          </template>
        </cd-table-column>
        <cd-table-column
          label="操作"
          width="80"
          fixed="right">
          <template slot-scope="scope">
            <cd-text-action @click="update(scope.row)">修改</cd-text-action>
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
    <md-edit :visible.sync="editVisible"
      :role="currentRole"
      @update="updateCallback"></md-edit>
  </hl-page>
</template>
<script>
import {
  HlPage,
  HlIcon,
  HlStatusText,
} from 'comp@';
import {
  roleApi,
} from 'api@';
import _ from 'lodash';
import MdEdit from './edit.md.vue';

export default {
  name: 'MainParent_Sys_Role',
  components: {
    HlPage,
    HlIcon,
    HlStatusText,
    MdEdit,
  },
  withLoading: true,
  data() {
    return {
      query: {
        type: 'roleName',
        search: '',
      },
      roles: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      editVisible: false,
      currentRole: {},
    };
  },
  computed: {
  },
  methods: {
    async loadData$() {
      const query = {};
      if (this.query.search) {
        query[this.query.type] = this.query.search;
      }
      const rolesSumary = await roleApi.paging(query, this.pageIndex, this.pageSize);
      this.total = rolesSumary.total || 0;
      this.roles = (rolesSumary.content || []).map((item) => {
        const _item = item;
        return _item;
      });
    },
    add() {
      this.push_('/sys/role/add');
    },
    update(role) {
      this.currentRole = _.cloneDeep(role);
      this.editVisible = true;
    },
    updateCallback(role) {
      const index = this.roles.findIndex(item => item.roleId === role.roleId);
      if (index !== -1) {
        this.roles.splice(index, 1, role);
        this.roles = [...this.roles];
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
