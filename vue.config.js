// eslint-disable-next-line
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'service.url': JSON.stringify(process.env.serviceUrl),
      }),
      new StyleLintPlugin({
        files: ['**/*.{vue,less}'],
      }),
    ],
  },
  chainWebpack: config => {
    config.plugin('copy').tap(args => {
      args[0][0].ignore = ['.DS_Store'];
      return args;
    });
  },
};
