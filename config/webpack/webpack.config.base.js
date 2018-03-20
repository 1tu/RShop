const helpers = require('./helpers'),
  CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

let config = {
  entry: {
    main: helpers.root('/client/main.ts')
  },
  output: {
    path: helpers.root('/public'),
    publicPath: '/',
    filename: 'js/build.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      public: helpers.root('./public')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
          options: { configFileName: 'tsconfig.client.json' }
        }
      },
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              doctype: 'html'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
    // new CopyWebpackPlugin([{
    //   from: 'src/assets',
    //   to: './assets'
    // },]),
  ]
};

module.exports = config;
