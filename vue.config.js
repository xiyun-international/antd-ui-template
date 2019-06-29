// eslint-disable-next-line
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['**/*.{vue,less}'],
      }),
    ],
  },
};
