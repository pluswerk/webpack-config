const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (runDirectory, settings) => ({
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    symlinks: false,
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  output: (publicPath) => ({
    filename: '[name].js',
    chunkFilename: '[name].chunk.js?bust=[contenthash]',
    path: path.resolve(runDirectory, settings.directory.generated),
    publicPath: publicPath,
  }),
  performance: {
    assetFilter(assetFilename) {
      return !(/\.map(\?.*)*$/.test(assetFilename));
    },
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    public: `${process.env.NODE_DOMAIN}`,
    hot: true,
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'warning',
    overlay: {
      warnings: true,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    before: () => {
      require('./setNodeActiveEnvVar')(settings, true);
    },
  },
  plugins: {
    stylelint: (autoFix) => ({
      configFile: settings.files.stylelint,
      syntax: 'scss',
      files: settings.directory.scss.replace(/(\/)$/g, '') + '/**/*.{vue-scss,vue,htm,html,css,sss,less,scss,sass}',
      fix: autoFix,
    }),
  },
  rules: {
    vue: {
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    vueStyleLoader: {
      test: /\.vue-scss$/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    styleLoader: {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    miniCssExtract: {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    ts: (autoFix) => ({
      test: /\.ts$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            context: runDirectory,
            configFile: path.resolve(runDirectory, settings.files.tsConfig),
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        {
          loader: 'tslint-loader',
          options: {
            context: runDirectory,
            configFile: path.resolve(runDirectory, settings.files.tsLint),
            tsConfigFile: path.resolve(runDirectory, settings.files.tsConfig),
            emitErrors: true,
            formatter: 'codeFrame',
            fix: autoFix,
          },
        },
      ],
    }),
    tsLint: (autoFix) => ({
      test: /\.tsx?$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      options: {
        configFile: path.resolve(runDirectory, settings.files.tsLint),
        tsConfigFile: path.resolve(runDirectory, settings.files.tsConfig),
        emitErrors: true,
        formatter: 'codeFrame',
        fix: autoFix,
      },
      include: [
        path.resolve(runDirectory, settings.directory.typescript),
      ],
    }),
  },
});
