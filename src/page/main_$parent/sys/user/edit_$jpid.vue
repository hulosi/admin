<style lang="scss" rel="stylesheet/scss" module>
.inner {
  max-width: 800px;
  margin: auto;
  padding-top: 24px;
}

.footer {
  margin-left:  -10px;
  margin-right: -10px;
  text-align: center;
}
</style>
<template>
  <hl-page :class="$style.page"
    :title="userName"
    show-back>
    <el-form ref="form"
      :model="user"
      :rules="rules"
      size="medium"
      label-width="120px"
      style="padding-bottom: 60px;">
      <cd-panel
        title="系统信息"
        line>
        <div :class="$style.inner">
          <el-form-item label="账号:"
            prop="userName">
            <el-input v-model="user.userName"
              placeholder="请设置用户登录使用的账户名"></el-input>
          </el-form-item>
          <el-form-item label="密码:"
            prop="password">
            <el-input v-model="user.password"
              :disabled="Boolean(user.userId)"
              placeholder="请设置用户初始密码"
              show-password></el-input>
          </el-form-item>
          <el-form-item label="系统角色:"
            prop="roleId">
            <el-select v-model="user.roleId"
              :disabled="Boolean(user.userId)"
              placeholder="请选择用户所属角色"
              style="width: 100%">
              <el-option v-for="role in roles"
                :key="role.roleId"
                :value="role.roleId"
                :label="role.roleName">{{ role.roleName }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否生效:">
            <el-switch v-model="user.actived">
            </el-switch>
          </el-form-item>
        </div>
      </cd-panel>
      <cd-panel
        title="联系信息"
        line
        style="margin-top: 16px;">
        <div :class="$style.inner">
          <el-form-item label="手机:"
            prop="mobile">
            <cd-input-phone v-model="user.mobile"
              placeholder="请设置用户联系手机号"></cd-input-phone>
          </el-form-item>
          <el-form-item label="邮箱:"
            prop="email">
            <el-input v-model="user.email"
              placeholder="请设置用户联系邮箱"></el-input>
          </el-form-item>
          <el-form-item label="座机:"
            prop="tel">
            <el-input v-model="user.tel"
              placeholder="请设置用户联系座机"></el-input>
          </el-form-item>
          <el-form-item label="微信:"
            prop="weixin">
            <el-input v-model="user.weixin"
              placeholder="请设置用户联系微信"></el-input>
          </el-form-item>
          <el-form-item label="qq:"
            prop="qq">
            <el-input v-model="user.qq"
              placeholder="请设置用户联系qq"></el-input>
          </el-form-item>
        </div>
      </cd-panel>
      <cd-panel
        title="个人信息"
        line
        style="margin-top: 16px;">
        <div :class="$style.inner">
          <el-form-item label="实际名:"
            prop="lastName">
            <el-input v-model="user.lastName"
              placeholder="请设置用户实际名字"></el-input>
          </el-form-item>
          <el-form-item label="性别:"
            prop="gender">
            <el-switch v-model="user.sex"
              active-text="男"
              inactive-text="女">
            </el-switch>
          </el-form-item>
          <el-form-item label="生日:"
            prop="birthDay">
            <el-date-picker
              v-model="user.birthDay"
              type="date"
              placeholder="请选择用户的生日"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </div>
      </cd-panel>
    </el-form>
    <cd-scum :offset-bottom="0">
      <cd-footer :class="$style.footer">
        <cd-button @click="cancel">取消</cd-button>
        <cd-button type="primary"
          @click="update">保存</cd-button>
      </cd-footer>
    </cd-scum>
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
  roleApi,
} from 'api@';
import u from '@candy/utils';
// import _ from 'lodash';

export default {
  name: 'MainParent_Sys_User_Edit',
  components: {
    HlPage,
    HlIcon,
    HlStatusText,
  },
  withLoading: true,
  data() {
    return {
      id: '',
      user: {
        actived: true,
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          {
            min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请设置用户初始密码', trigger: 'blur' },
          {
            validator: this.makeValidator_(async (rule, value) => {
              if (!u.string.isPassword(value)) {
                throw new Error('长度6-20个字符，包括大写字母、小写字母、数字、下划线至少两种');
              }
              return true;
            }),
            trigger: 'blur',
          },
        ],
        roleId: [{ required: true, message: '请输入用户账号', trigger: 'change' }],
        mobile: [{ required: true, message: '请输入用户联系手机', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入用户联系邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
        ],
        tel: [{
          type: 'string',
          pattern: u.regexp.constant.LANDLINE,
          message: '请输入正确的座机号码',
          trigger: 'blur',
        }],
        weixin: [{
          type: 'string',
          pattern: u.regexp.constant.WEIXIN_ACCOUNT,
          message: '请输入正确的微信账号',
          trigger: 'blur',
        }],
        qq: [{
          type: 'string',
          pattern: u.regexp.constant.QQ,
          message: '请输入正确的qq账号',
          trigger: 'blur',
        }],
        lastName: [{
          min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur',
        }],
      },
      roles: [],
    };
  },
  computed: {
    userName() {
      if (this.id === 'add') {
        return '新增用户';
      }
      return this.get_(this.user, 'lastName') || this.get_(this.user, 'userName');
    },
  },
  methods: {
    async loadData$() {
      const roles = await roleApi.paging({}, 1, 1e5);
      this.roles = (roles.content || []);
      this.roleFlat = u.array.identityMap(
        this.roles || [], 'roleId',
      );
      if (this.id === 'add') {
        return;
      }
      const user = await userApi.get(this.id);
      this.user = this.localize(user);
    },
    async update$() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error('有数据填写错误,请认真核对');
        return;
      }

      if (this.id === 'add') {
        await userApi.add(this.serialize());
      } else {
        await userApi.update(this.serialize());
      }
      this.push_('/sys/user');
    },
    cancel() {
      this.back_();
    },
    serialize() {
      const user = {
        ...this.user,
        status: this.user.actived ? 1 : 0,
        roleCode: this.roleFlat[this.user.roleId].roleCode,
        roleName: this.roleFlat[this.user.roleId].roleName,
        gender: this.user.sex ? 'M' : 'W',
      };
      if (this.id !== 'add') {
        delete user.password;
      }
      return user;
    },
    localize(user) {
      return {
        ...user,
        actived: user.status === 1,
        password: 'asd123456',
        sex: user.gender === 'M',
      };
    },
  },
  created() {
    this.id = this.getParam_('id');
    this.loadData();
  },
};
</script>
