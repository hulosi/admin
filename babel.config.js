/* eslint no-template-curly-in-string:0 */

module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: false,
    }],
  ],
  plugins: [
    'lodash',
    ['transform-imports', {
      'api@': {
        transform: 'api@/${member}',
        preventFullImport: true,
        kebabCase: true,
      },
      'mx@': {
        transform: 'mx@/${member}',
        preventFullImport: true,
        kebabCase: true,
      },
      'com@': {
        transform: 'com@/${member}',
        preventFullImport: true,
        kebabCase: true,
      },
      'comp@': {
        transform: 'comp@/${member}',
        preventFullImport: true,
        kebabCase: true,
      },
      'dire@': {
        transform: 'dire@/${member}',
        preventFullImport: true,
        kebabCase: true,
      },
    }],
  ],
};
