module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
