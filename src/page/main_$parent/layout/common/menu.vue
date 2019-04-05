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
      <el-submenu v-if="menu.subMenus"
        :key="menu.menuId"
        :index="menu.route">
        <template slot="title">
          <hl-icon :type="menu.icon"
            :class="$style.icon"></hl-icon>
          <span>{{ menu.menuName }}</span>
        </template>
        <el-menu-item v-for="childMenu in menu.subMenus"
          :key="childMenu.menuId"
          :index="childMenu.route">{{ childMenu.menuName }}</el-menu-item>
      </el-submenu>
      <el-menu-item v-else
        :key="menu.menuId"
        :index="menu.route">
        <hl-icon :type="menu.icon"
          :class="$style.icon"></hl-icon>
        <span slot="title">{{ menu.menuName }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import {
  HlIcon,
} from 'comp@';
import { mapState } from 'vuex';

export default {
  name: 'MainParentLayoutSiderMenu',
  components: {
    HlIcon,
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
    if (this.$route.path === process.env.BASE_URL) {
      this.active = this.$route.path;
      return;
    }
    this.menus.forEach((menu) => {
      if (!menu.subMenus || !menu.subMenus.length) {
        return;
      }
      menu.subMenus.forEach((subMenu) => {
        console.warn(this.$route.path, subMenu.route);
        if (this.$route.path.indexOf(subMenu.route) !== -1) {
          this.active = subMenu.route;
        }
      });
    });
  },
};
</script>
