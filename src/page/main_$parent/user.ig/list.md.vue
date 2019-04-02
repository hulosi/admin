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
</style>
<template>
  <cd-panel :class="$style.list">
    <header slot="header">
      <el-row :gutter="12">
        <el-col :xs="24" :sm="12" class="hidden-xs-only">
          <el-radio-group v-model="query.department"
            size="small"
            @change="loadUser">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button
              v-for="department in departments"
              :key="department.text"
              :label="department.text">{{department.text}}</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :xs="24"
          :sm="12"
          style="text-align: right;">
          <el-form @submit="loadUser">
            <el-input v-model="query.search"
              :class="$style.search"
              placeholder="请输入内容"
              size="medium"
              @change="loadUser">
              <el-select v-model="query.type"
                slot="prepend"
                placeholder="请选择"
                @change="loadUser">
                <el-option label="姓名" value="userName"></el-option>
                <el-option label="公司名" value="company"></el-option>
                <el-option label="真实名" value="name"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form>
        </el-col>
      </el-row>
    </header>
    <cd-table :data="users">
      <cd-table-column
        prop="userName"
        label="用户名"
        show-overflow-tooltip
        width="120"></cd-table-column>
      <cd-table-column
        prop="name"
        label="姓名"
        show-overflow-tooltip
        width="80"></cd-table-column>
      <cd-table-column
        prop="department"
        label="部门"
        show-overflow-tooltip
        width="120"></cd-table-column>
      <cd-table-column
        prop="company"
        label="公司名字"
        show-overflow-tooltip
        min-width="180"></cd-table-column>
      <cd-table-column
        prop="phone"
        label="联系电话"
        width="110"></cd-table-column>
      <cd-table-column
        prop="email"
        label="邮箱"
        show-overflow-tooltip
        width="180"></cd-table-column>
      <cd-table-column
        prop="status"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 'active' ? 'success' : 'danger'"
            size="small"
            disable-transitions>{{scope.row.status === 'active' ? '激活' : '未激活'}}</el-tag>
        </template>
      </cd-table-column>
      <cd-table-column
        label="操作"
        width="80"
        fixed="right">
        <template slot-scope="scope">
          <cd-text-action @click="viewDetail(scope.row)">详情</cd-text-action>
        </template>
      </cd-table-column>
    </cd-table>
    <div style="text-align: right; margin-top:16px;">
      <el-pagination
        @size-change="loadUser"
        @current-change="loadUser"
        :current-page.sync="pageIndex"
        :page-sizes="[10, 15, 25, 40]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </cd-panel>
</template>
<script>
import data from './data';

export default {
  name: 'MainParent_User_User',
  components: {
  },
  data() {
    return {
      query: {
        department: 'all',
        type: 'name',
        search: '',
      },
      departments: [],
      users: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  computed: {
  },
  methods: {
    loadUser() {
      const query = {};
      if (this.query.department && this.query.department !== 'all') {
        query.department = this.query.department;
      }
      if (this.query.type === 'name' && this.query.search) {
        query.name = this.query.search;
      }
      if (this.query.type === 'userName' && this.query.search) {
        query.userName = this.query.search;
      }
      if (this.query.type === 'company' && this.query.search) {
        query.company = this.query.search;
      }

      const users = data.getUsers(this.pageIndex, this.pageSize, query);
      this.users = users.list;
      this.total = users.total;
    },
    viewDetail(user) {
      this.push_(`/user/${user.id}`);
    },
  },
  created() {
    this.departments = data.getDepartments();
    this.loadUser();
  },
};
</script>
