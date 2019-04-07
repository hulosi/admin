/* eslint import/no-extraneous-dependencies:0 */
const nodeUtils = require('@upman/node-utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const _ = require('lodash');
const LodashWebpackPlugin = require('lodash-webpack-plugin');

class ModuleChunkTest {
  constructor(pakageName) {
    this.pakageName = pakageName;
  }

  test(module) {
    if (!module.resource) {
      return false;
    }

    const path = module.resource;
    let cnpmPakageName;
    if (_.startsWith(this.pakageName, '@')
      // 命名空间
      && this.pakageName.indexOf('/') === -1) {
      cnpmPakageName = `_${this.pakageName}`;
    } else {
      cnpmPakageName = this.pakageName.split('/').map(item => `_${item}`).join('');
      cnpmPakageName += '@';
    }
    const isMatchCnpm = new RegExp(`node_modules/${cnpmPakageName}`).test(path);
    const isMatchNpm = new RegExp(`node_modules/${this.pakageName}/`).test(path);
    return isMatchCnpm || isMatchNpm;
  }
}

class VendorChunkTest {
  test(module, vendors) {
    // 无用代码,躲过检测
    this._unuse = '';

    let isVendor = false;
    for (let i = 0; i < vendors.length; i += 1) {
      const moduleChunkTest = new ModuleChunkTest(vendors[i]);
      if (moduleChunkTest.test(module)) {
        isVendor = true;
      }
      if (isVendor) {
        return true;
      }
    }
    return false;
  }
}

class BaseVendorChunkTest extends VendorChunkTest {
  constructor() {
    super();
    this.vendors = [
      'vue', 'vuex', 'vue-router',
      'dayjs', 'axios', 'qs', 'core-js', '@candy',
      'animejs', 'js-cookie', 'resize-detector',
      'js-base64', 'lottie-web', 'qrcode',
      'element-ui', 'animate.css', 'mockjs',
      'querystring',
    ];
  }

  test(chunks) {
    return super.test(chunks, this.vendors);
  }
}

class CssChunkTest {
  constructor() {
    this.constructorName = 'CssModule';
  }

  test(module) {
    return module.constructor.name === this.constructorName;
  }
}

class ElementUICssChunkTest extends CssChunkTest {
  constructor() {
    super();
    this.dirName = 'theme';
  }

  test(module) {
    return super.test(module)
      && _.startsWith(module.issuer.resource, nodeUtils.resolve(this.dirName));
  }
}

class CdIconCssChunkTest extends CssChunkTest {
  constructor() {
    super();
    this.dirPath = 'uipublic/components/lib/cd-icon';
  }

  test(module) {
    return super.test(module)
      && _.startsWith(module.issuer.resource,
        nodeUtils.resolve(this.dirPath));
  }
}

class CdCompChunkTest {
  test(module, comps) {
    // 无用代码,躲过检测
    this._unuse = '';
    return comps.some(item => (module.resource || '').includes(item));
  }
}

class BaseCdCompChunkTest extends CdCompChunkTest {
  constructor() {
    super();
    this.comps = ['cd-page', 'cd-panel', 'cd-icon', 'cd-title-bar', 'cd-query'];
  }

  test(module) {
    return super.test(module, this.comps);
  }
}

// builder不需要默认配置该chunk,因为后续的Echart会异步导入
class EchartChunkTest {
  constructor() {
    this.comps = ['cd-chart'];
    this.vendors = ['zrender', 'echarts'];
  }

  test(module) {
    return new VendorChunkTest().test(module, this.vendors)
      || new BaseCdCompChunkTest().test(module, this.comps);
  }
}


// 屏蔽webpack的控制台信息的过滤器

class ConsoleMessageFilterPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap(
      'ConsoleMessageFilterPlugin',
      (compilation) => {
        const _compilation = compilation;
        _compilation.warnings = (compilation.warnings).filter(
          (warning) => {
            console.log('==========filter:', warning.message);
            return !this.options.filter.test(warning.message);
          },
        );
      },
    );
  }
}

const assetsDir = 'static';
const outputDir = 'docs';
const appName = 'admin-element';

// 定义常量
process.env.VUE_APP_APP_NAME = appName;

module.exports = {
  appName,
  indexGenerator: [{}],
  compiler: {
    lintOnSave: 'error',
    assetsDir,
    outputDir,
    publicPath: appName ? `/${appName}/` : '/',
    configureWebpack: {
      optimization: {
        mergeDuplicateChunks: true,
        runtimeChunk: true,
        splitChunks: {
          chunks: 'all',
          minSize: 3000,
          minChunks: 2,
          maxInitialRequests: 5,
          maxAsyncRequests: 10,
          automaticNameDelimiter: '-',
          cacheGroups: {
            default: false,
            vendor: {
              chunks: 'all',
              priority: 1000,
              name: 'vendor',
              minSize: 0,
              minChunks: 1,
              test(module) {
                // 请勿简写到test上面去,因为会改变对象中this指向
                return new BaseVendorChunkTest().test(module);
              },
            },
            elementUI: {
              chunks: 'async',
              priority: 500,
              name: 'element-ui',
              minSize: 0,
              minChunks: 1,
              test(module) {
                return new ModuleChunkTest('element-ui').test(module);
              },
            },
            elementUICSS: {
              chunks: 'async',
              priority: 510,
              name: 'element-ui-css',
              minSize: 0,
              minChunks: 1,
              test(module) {
                return new ElementUICssChunkTest().test(module);
              },
            },
            asynValidator: {
              chunks: 'async',
              priority: 520,
              name: 'async-validator',
              minSize: 0,
              minChunks: 1,
              test(module) {
                return new ModuleChunkTest('async-validator').test(module);
              },
            },
            normalizeWheel: {
              chunks: 'async',
              priority: 530,
              name: 'normalize-wheel',
              minSize: 0,
              minChunks: 1,
              test(module) {
                return new ModuleChunkTest('normalize-wheel').test(module);
              },
            },
            cdIconCss: {
              chunks: 'async',
              priority: 540,
              name: 'cd-icon-css',
              minSize: 0,
              minChunks: 1,
              test(module) {
                return new CdIconCssChunkTest().test(module);
              },
            },
            baseCdComp: {
              chunks: 'async',
              priority: 550,
              name: 'base-cd-comp',
              minSize: 0,
              minChunks: 1,
              test(module) {
                return new BaseCdCompChunkTest().test(module);
              },
            },
            chart: {
              chunks: 'async',
              priority: 560,
              name: 'chart',
              minSize: 0,
              minChunks: 1,
              test(module) {
                return new EchartChunkTest().test(module);
              },
            },
          },
        },
      },
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          'elStyle@': nodeUtils.resolve('theme/index.css'),
          'asset@': nodeUtils.resolve('src/asset'),
          '@': nodeUtils.resolve('src'),
          'api@': nodeUtils.resolve('src/api'),
          'com@': nodeUtils.resolve('src/common'),
          'comp@': nodeUtils.resolve('src/component'),
          'conf@': nodeUtils.resolve('src/conf'),
          'config@': nodeUtils.resolve('src/conf/config'),
          'mx@': nodeUtils.resolve('src/mixin'),
          'dire@': nodeUtils.resolve('src/directive'),
          'page@': nodeUtils.resolve('src/page'),
        },
      },
      stats: {
        warnings: false,
      },
      devServer: { disableHostCheck: true },
    },
    chainWebpack(config) {
      config.plugins.delete('copy');
      config.plugins.delete('copy-html');
      config
        .plugin('copy')
        .use(CopyWebpackPlugin, [[{
          from: nodeUtils.resolve('static'),
          to: nodeUtils.resolve(`${outputDir}/${assetsDir}`),
          toType: 'dir',
          ignore: ['.DS_Store'],
        }]]);
      config
        .plugin('copy-html')
        .use(CopyWebpackPlugin, [[{
          from: nodeUtils.resolve('html'),
          to: nodeUtils.resolve(outputDir),
          toType: 'dir',
          ignore: [
            '.DS_Store', 'index_build.html', 'index_server.html', 'index.html', 'index_develop.html',
          ],
        }]]);
      if (config.plugins.has('html')) {
        config.plugin('html').tap((args) => {
          const _args = args;
          const { env } = process.UP_MAN_ENVIRONMENT.getCliConfig();
          if (env === 'prod') {
            _args[0].template = nodeUtils.resolve('html/index.html');
          } else {
            _args[0].template = nodeUtils.resolve('html/index_develop.html');
          }
          return _args;
        });
      }
      config
        .plugin('lodash')
        .use(LodashWebpackPlugin, [
          {
            collections: true,
            paths: true,
          },
        ]);
      config
        .plugin('filter-webpack-message')
        .use(ConsoleMessageFilterPlugin,
          [{ filter: /chunk styles \[mini-css-extract-plugin]\nConflicting order between:/ }]);
    },
    productionSourceMap: false,
    css: {
      loaderOptions: {
        css: {
          localIdentName: '[name]-[hash]',
          camelCase: 'only',
        },
        sass: {
          includePaths: [
            nodeUtils.resolve('src/asset'),
          ],
          data: "@import 'base.scss';",
        },
      },
    },
    transpileDependencies: [
      /@candy/, /_@candy/,
    ],
    devServer: {
      disableHostCheck: true,
    },
  },
};
