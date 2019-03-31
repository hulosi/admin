/* eslint import/no-extraneous-dependencies:0 */
const nodeUtils = require('@upman/node-utils');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 1, { allow: ["warn", "error"] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': 0,
    'no-continue': 0,
    'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
    'no-unused-vars': [2, { argsIgnorePattern: 'h' }],
    'vue/html-self-closing': 0,
    "vue/max-attributes-per-line": ["error", {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": true,
      }
    }],
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": false,
      "ignores": []
    }],
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "methods",
        ["template", "render"],
        "renderError",
        "LIFECYCLE_HOOKS",
      ]
    }],
    'vue/require-default-prop': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: nodeUtils.resolve('node_modules/@upman/builder')
      }
    },
  },
};
