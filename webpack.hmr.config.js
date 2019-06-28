const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const merge = require('webpack-merge');

require('dotenv').config();
const settings = require('./getSettings')();
const runDirectory = path.resolve(__dirname, '../../../');
const partialConfig = require('./webpack.partial.config.js')(runDirectory, settings);

/* lintDirtyModules is not working at the moment
* https://github.com/webpack-contrib/stylelint-webpack-plugin/pull/157
*/

module.exports = (env, argv) => {
  const autoFix = typeof argv.fix !== 'undefined';

  const resultingWebpackConfig = merge({
    context: runDirectory,
    entry: settings.entry,
    devtool: 'source-map',
    resolve: partialConfig.resolve,
    output: partialConfig.output(`${process.env.NODE_DOMAIN}/`),
    performance: partialConfig.performance,
    devServer: partialConfig.devServer,
    module: {
      rules: [
        partialConfig.rules.vue,
        partialConfig.rules.vueStyleLoader,
        partialConfig.rules.styleLoader,
        partialConfig.rules.ts(autoFix),
      ],
    },
    plugins: [
      new StyleLintPlugin(partialConfig.plugins.stylelint(autoFix)),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin(settings.definePlugin || {}),
    ],
  }, settings.webpackConfig || {});

  return resultingWebpackConfig;
};
