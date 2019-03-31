<style lang="scss" rel="stylesheet/scss" module>
@import "./var.scss";

.menu {
  border-right: 0px solid $siderColor;
  &:global(.el-menu),
  & :global(.el-menu) {
    background-color: $siderColor;
  }
  &:not(:global(.el-menu--collapse)) {
    width: 240px;
  }
  :global(.el-menu-item),
  :global(.el-submenu__title),
  :global(.el-menu-item) {
    color: #d1cfcf;
  }
  :global(.el-menu-item):hover,
  :global(.el-submenu__title):hover,
  :global(.el-menu-item):focus {
    background-color: $siderColor;
    color: #fff;
  }
  :global(.el-submenu__title) {
    i, .icon {
      transition: color .3s;
    }
    &:hover i, .icon{
      color: #fff;
    }
  }
  :global(.el-menu-item):global(.is-active) {
    background-color: $_primaryColor;
    color: #fff;
  }
}

.icon {
  transform: translateY(-1px);
  margin-right: 8px;
}
</style>
<template>
  <el-menu :class="$style.menu"
    :default-active="active"
    :collapse="collapse"
    router
    unique-opened>
    <template v-for="menu in menus">
      <el-submenu v-if="menu.childs"
        :key="menu.id"
        :index="menu.id">
        <template slot="title">
          <cb-icon :type="menu.icon"
            :class="$style.icon"></cb-icon>
          <span>{{ menu.text }}</span>
        </template>
        <el-menu-item v-for="childMenu in menu.childs"
          :key="childMenu.id"
          :index="childMenu.router">{{ childMenu.text }}</el-menu-item>
      </el-submenu>
      <el-menu-item v-else
        :key="menu.id"
        :index="menu.router">
        <cb-icon :type="menu.icon"
          :class="$style.icon"></cb-icon>
        <span slot="title">{{ menu.text }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import {
  CbIcon,
} from 'comp@';
import { mapState } from 'vuex';

export default {
  name: 'MainParentLayoutSiderMenu',
  components: {
    CbIcon,
  },
  data() {
    return {
      active: '',
    };
  },
  computed: {
    ...mapState({
      collapse: state => state.menu.collapse,
      menus: state => state.menu.list,
    }),
  },
  methods: {
  },
  created() {
    this.menus.forEach((menu) => {
      if (!menu.childs || !menu.childs.length) {
        return;
      }
      menu.childs.forEach((subMenu) => {
        if (this.$route.path.indexOf(subMenu.router) !== -1) {
          this.active = subMenu.router;
        }
      });
    });
  },
};
</script>
