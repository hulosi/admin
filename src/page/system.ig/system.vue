<style lang="scss" rel="stylesheet/scss" module>
.page {
  width: 100%;
  min-height: 100vh;
  background-color: $_mainBgColor;
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-image: linear-gradient(-90deg, $_primaryColor 0%, darken($_primaryColor, 5%) 100%);
  height: 60px;
  line-height: 60px;
  color: #fff;
  .inner {
    height: 100%;
    max-width: 1200px;
    padding: 0 16px;
    margin: auto;
    position: relative;
  }
  .logo {
    text-decoration: none;
    .image {
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      height: 24px;
    }
    .text {
      display: inline-block;
      font-size: 16px;
      color: #fff;
    }
  }
  .navbar {
    position: absolute;
    top: 0;
    right: 20px;
    height: 100%;
    a {
      display: inline-block;
      padding: 0 20px;
      color: #fff;
      margin: 0 10px;
      height: 40px;
      line-height: 40px;
      vertical-align: middle;
      border-radius: 4px;
      &:hover {
        background-color: rgba(255, 255, 255, .2);
      }
    }
  }
  .dropdown {
    position: absolute;
    top: 0;
    right: 20px;
    height: 100%;
    color: #fff;
    font-size: 16px;
  }
}

.body {
  max-width: 1200px;
  padding-top: 60px;
  margin: auto
}

.search {
  padding: 40px 8px 30px 8px;
  margin: auto;
  max-width: 380px;
  :global(.el-input-group--append) :global(.el-input__inner) {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-color: transparent;
  }
  :global(.el-input-group__append) {
    background-color: darken($_primaryColor, 5%);
    color: #fff;
    border-color: darken($_primaryColor, 5%);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.10);
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}

.products {
  padding: 0 8px;
}
.product {
  height: 250px;
  overflow: hidden;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 10px 40px 0 rgba(62,57,107,.07), 0 2px 9px 0 rgba(62,57,107,.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, box-shadow;
  padding: 0px 16px 0 16px;
  margin-bottom: 36px;
  &:hover {
    transform: translateY(-5px) translateZ(0);
    box-shadow: 0 16px 32px 0 rgba(62,57,107,0.28), 0 0 0 transparent;
  }
  .icon {
    margin: 0 auto 0px auto;
    text-align: center;
    font-size: 70px;
    height: 88px;
  }
  .text {
    text-align: center;
    font-size: 18px;
    color: $_text40Color;
    font-weight: bold;
  }
  .desc {
    text-align: center;
    font-size: 14px;
    margin-top: 8px;
    color: $_text20Color;
    font-size: 14px;
  }
}
</style>
<template>
<cd-page :class="$style.page">
  <header :class="$style.header">
    <div :class="$style.inner">
      <a :class="$style.logo">
        <img :class="$style.image" src="./logo.png" alt="logo">
        <span :class="$style.text">CBMP 易捷云核心新业务管控平台</span>
      </a>
      <div :class="[$style.navbar, 'hidden-sm-and-down']">
        <a href="">注册</a>
        <a href="">重新登录</a>
      </div>
      <el-dropdown :class="[$style.dropdown, 'hidden-md-and-up']"
        trigger="click">
        <span class="el-dropdown-link">
          <cb-icon type="mulu" colorful :colors="['currentColor']"></cb-icon>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>注册</el-dropdown-item>
          <el-dropdown-item>重新登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
  <section :class="$style.body">
    <p :class="$style.search">
      <el-input size="medium"
        v-model="search"
        placeholder="搜索你想要查看的文档">
        <template slot="append">搜索</template>
      </el-input>
    </p>
    <div :class="$style.products">
      <el-row :gutter="32">
        <el-col :sm="12" :md="8"
          :key="product.icon"
          v-for="product in viewProducts">
          <div :class="$style.product">
            <div :class="$style.icon">
              <cb-icon :type="product.icon"></cb-icon>
            </div>
            <div :class="$style.text">{{product.text}}</div>
            <div :class="$style.desc">{{product.desc}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</cd-page>
</template>
<script>
import {
  CdPage,
  CdPanel,
} from '@candy/ui/component';
import {
  CbIcon,
} from 'comp@';

export default {
  name: 'Index_Index',
  components: {
    CdPage,
    CdPanel,
    CbIcon,
  },
  data() {
    return {
      products: [{
        icon: 'xiangganghangkong_HX',
        text: '香港航空_HX',
      }, {
        icon: 'shanghaijixianghangkong_HO',
        text: 'shanghaijixianghangkong_HO',
        desc: '上海吉祥航空_HO',
      }, {
        icon: 'xiangpenghangkong_L',
        text: 'xiangpenghangkong_L',
        desc: '祥鹏航空_8L',
      }, {
        icon: 'shouduhangkong_JD',
        text: 'shouduhangkong_JD',
        desc: '首都航空_JD',
      }, {
        icon: 'shanghaihangkong_FM',
        text: 'shanghaihangkong_FM',
        desc: '上海航空_FM',
      }, {
        icon: 'sichuanhangkong_U',
        text: 'sichuanhangkong_U',
        desc: '四川航空_3U',
      }, {
        icon: 'shenzhenhangkong_ZH',
        text: 'shenzhenhangkong_ZH',
        desc: '深圳航空_ZH',
      }, {
        icon: 'shamenhangkong_MF',
        text: 'shamenhangkong_MF',
        desc: '厦门航空_MF',
      }, {
        icon: 'zhongguoguojihangkong_CA',
        text: 'zhongguoguojihangkong_CA',
        desc: '中国国际航空_CA',
      }, {
        icon: 'dongfanghangkong_MU',
        text: 'dongfanghangkong_MU',
        desc: '东方航空_MU',
      }, {
        icon: 'zhongguonanfanghangkong_CZ',
        text: 'zhongguonanfanghangkong_CZ',
        desc: '中国南方航空_CZ',
      }, {
        icon: 'changronghangkong_BR',
        text: 'changronghangkong_BR',
        desc: '长荣航空_BR',
      }, {
        icon: 'xinjiapohangkong_SQ',
        text: 'xinjiapohangkong_SQ',
        desc: '新加坡航空_SQ',
      }, {
        icon: 'zhonghuahangkong_CI',
        text: 'zhonghuahangkong_CI',
        desc: '中华航空_CI',
      }, {
        icon: 'hainanhangkong_HU',
        text: 'hainanhangkong_HU',
        desc: '海南航空_HU',
      }, {
        icon: 'tianjinhangkong_GX',
        text: 'tianjinhangkong_GX',
        desc: '天津航空_GX',
      }, {
        icon: 'shandonghangkong_SC',
        text: 'shandonghangkong_SC',
        desc: '山东航空_SC',
      }, {
        icon: 'xicanghangkong_TV',
        text: 'xicanghangkong_TV',
        desc: '西藏航空_TV',
      }].map((item) => {
        const _item = item;
        _item.desc = '汉得应用开发平台（HAND Application Platform）是汉得公司为了应对移动互联网化、'
          + '应用云端化、海量数据化和数字化服务转型的应用开发平台，是中台化产品和应用开发的基础平台。'
          + 'HAP采用开源的Java EE技术体系，平台设计灵活可扩展、可应对高并发需求。';
        return _item;
      }),
      search: '',
    };
  },
  computed: {
    viewProducts() {
      return this.products.filter(product => product.desc.indexOf(this.search) !== -1);
    },
  },
  methods: {
  },
  created() {
  },
};
</script>
