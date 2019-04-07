<style lang="scss" rel="stylesheet/scss" module>
.modal {
  :global(.el-dialog) {
    width: calc(100% - 20px) !important;
    max-width: 500px !important;
  }
}
</style>
<template>
  <cd-modal-panel :visible.sync="self$.visible"
    :title="role.roleCode"
    :class="$style.modal"
    fixed-header>
    <el-form ref="form"
      :model="role"
      :rules="rules"
      label-width="80px">
      <cd-panel hide-header>
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
            @click="update">修改</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </cd-panel>
    </el-form>
  </cd-modal-panel>
</template>
<script>
import _ from 'lodash';
import {
  DoubleBind,
} from '@candy/ui/mixin';
import {
  roleApi,
} from 'api@';

export default {
  name: 'MainParent_Role_Edit_JpId',
  components: {
  },
  mixins: [DoubleBind],
  doubleBind: ['visible'],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    role: Object,
  },
  data() {
    return {
      user: {},
      rules: {
        roleName: [
          { required: true, message: '请输入角色名字', trigger: 'blur' },
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
    cancel() {
      this.self$.visible = false;
    },
    async update() {
      await this.$refs.form.validate();

      try {
        await this.withLoading_(async () => {
          await roleApi.update(_.cloneDeep(this.role));
        });
      } finally {
        this.self$.visible = false;
      }

      this.$emit('update', this.role);
    },
  },
  created() {
  },
};
</script>
