/*
 * @Author: 宋绍华
 * @Date: 2021-10-18 17:24:40
 * @LastEditTime: 2021-10-19 10:56:04
 * @LastEditors: 宋绍华
 * @Description:
 * @FilePath: \rppcui\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['@vue/airbnb', 'plugin:vue/essential'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'import/extensions': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: [2, 'never'], // 去掉尾部分号
    'comma-dangle': ['error', 'never'],
    'max-len': 0
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
