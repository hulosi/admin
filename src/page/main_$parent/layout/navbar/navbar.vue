<style lang="scss" rel="stylesheet/scss" module>
@import "../common/var.scss";

.navbar {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  padding-right: 24px;
  box-shadow: rgba(0, 34, 77, 0.1) 0px 1px 3px;
  z-index: 1;
}

.menuSwitchBox {
  float: left;
  width: 48px;
  text-align: center;
  line-height: 48px;
  height: 48px;
  transform: background-color .3s;
  background-color: #fff;
  .menuSwitch {
    font-size: 20px;
    font-size: #fff;
    transform: translateY(6px);
  }
  &:hover {
    background-color: lighten($_primaryColor, 20%);
  }
}

.right {
  float: right;
}

.iconBox {
  display: inline-block;
  cursor: pointer;
  width: 68px;
  text-align: center;
  line-height: 48px;
  height: 48px;
  font-size: 16px;
}

.avatar {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  vertical-align: middle;
  img {
    width: 30px;
    height: 30px;
  }
}

</style>
<template>
  <header :class="$style.navbar">
    <div v-if="collapse"
      :class="$style.menuSwitchBox"
      @click="toggleMenu">
      <hl-icon :class="[$style.menuSwitch, 'hidden-sm-and-down', 'hidden-sm-only']"
        type="menuon"></hl-icon>
    </div>
    <div v-else
      :class="[$style.menuSwitchBox, 'hidden-sm-and-down', 'hidden-sm-only']"
      @click="toggleMenu">
      <hl-icon :class="$style.menuSwitch"
        type="menuoff"></hl-icon>
    </div>
    <div :class="[$style.menuSwitchBox, 'hidden-md-and-up']"
      @click="openMenu">
      <hl-icon :class="$style.menuSwitch"
        type="menuon"></hl-icon>
      <cd-drawer v-model="menuVisible"
        :background="$style.varSiderColor"
        left
        fill>
        <md-menu></md-menu>
      </cd-drawer>
    </div>
    <div :class="$style.right">
      <el-dropdown trigger="click">
        <cd-button size="mini">语言</cd-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>中文</el-dropdown-item>
          <el-dropdown-item>英语</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div :class="$style.iconBox">
        <hl-icon type="navbar-tongzhi"></hl-icon>
      </div>
      <div :class="$style.avatar">
        <img src="https://files.cloopm.com/avatar/a3080ab2-296f-4242-b23b-00bc17f980f3.png"
          alt="用户头像">
      </div>
    </div>
  </header>
</template>
<script>
import {
  HlIcon,
} from 'comp@';
import { mapState } from 'vuex';
import MdMenu from '../common/menu.vue';

export default {
  name: 'MainParentLayoutNavbarNavbar',
  components: {
    HlIcon,
    MdMenu,
  },
  data() {
    return {
      menuVisible: false,
    };
  },
  computed: {
    ...mapState({
      collapse: state => state.menu.collapse,
    }),
  },
  methods: {
    toggleMenu() {
      this.commit_('setCollapse', !this.collapse);
    },
    openMenu() {
      this.menuVisible = true;
    },
  },
  created() {
  },
};
</script>
