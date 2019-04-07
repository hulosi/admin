<style lang="scss" rel="stylesheet/scss" module>
.page {
}
</style>
<template>
  <hl-page :class="$style.page"
    show-back
    title="添加一个新的角色">
    <el-form ref="form"
      :model="role"
      :rules="rules"
      label-width="80px">
      <cd-panel hide-header>
        <el-form-item label="角色编码"
          prop="roleCode">
          <el-input v-model="role.roleCode"
            placeholder="给角色一个简短的标识吧"></el-input>
        </el-form-item>
        <el-form-item label="角色名"
          prop="roleName">
          <el-input v-model="role.roleName"
            placeholder="这个角色叫什么名字呢?"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="role.enabled"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="add">添加</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </cd-panel>
    </el-form>
  </hl-page>
</template>
<script>
import {
  HlPage,
} from 'comp@';
import {
  roleApi,
} from 'api@';
import _ from 'lodash';

export default {
  name: 'MainParent_User_UserId_Edit',
  components: {
    HlPage,
  },
  withLoading: true,
  data() {
    return {
      role: {
        enabled: true,
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名字', trigger: 'blur' },
          {
            min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur',
          },
        ],
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' },
          {
            min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
  },
  methods: {
    async add$() {
      await this.$refs.form.validate();

      const role = await roleApi.add(_.cloneDeep(this.role));
      this.push(`/sys/role/${role.roleId}`);
    },
    cancel() {
      this.back_();
    },
  },
  created() {
  },
};
</script>
