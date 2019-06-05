'use strict';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const merge = require('webpack-merge');

const settings = require('./getSettings')();
const runDirectory = path.resolve(__dirname, '../../../');
const partialConfig = require('./webpack.partial.config.js')(runDirectory, settings);


module.exports = (env, argv) => {
  const autoFix = typeof argv.fix !== 'undefined';

  require('./setNodeActiveEnvVar')(settings, false);

  const resultingWebpackConfig = merge({
    context: runDirectory,
    entry: settings.entry,
    devtool: 'source-map',
    resolve: partialConfig.resolve,
    output: partialConfig.output(settings.directory.generated),
    performance: partialConfig.performance,
    module: {
      rules: [
        partialConfig.rules.vue,
        partialConfig.rules.vueStyleLoader,
        partialConfig.rules.styleLoader,
        partialConfig.rules.ts(autoFix),
        // partialConfig.rules.vue,
        // partialConfig.rules.vueStyleLoader,
        // partialConfig.rules.miniCssExtract,
        // partialConfig.rules.ts(autoFix),
      ],
    },
    plugins: [
      // new MiniCssExtractPlugin({
      //   filename: '[name].css?bust=[contenthash]',
      //   chunkFilename: '[id].css',
      // }),
      new StyleLintPlugin(partialConfig.plugins.stylelint(autoFix)),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin(partialConfig.plugins.define),
    ],
  }, settings.webpackConfig || {});

  return resultingWebpackConfig;
};
