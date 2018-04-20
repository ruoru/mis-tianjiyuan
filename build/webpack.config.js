const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const environments = require('../config/environments');
const version = require('../package').version;

module.exports = env => {
  const environment = environments[(env && env.env) || 'prod'];

  return {
    entry: {
      main: './src/main.js',
    },

    output: {
      path: resolve(__dirname, '../dist'),
      filename: `[name]-v${version}.js`,
    },

    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.json'],
    },

    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],  //不通过该babel处理，提高打包速度。
          include: [/src/],           //指定打包范围
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: [
                ['import', { libraryName: 'antd', style: 'css' }] // `style: true` 会加载 less 文件
              ],
            }
          }
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,     // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader. 在css-loader之后，指定几个loader处理import的css
              },
            },
            {
              loader: "sass-loader"
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  //require('autoprefixer')
                ]
              },
            },
          ]
        },
        {
          test: /\.(jpg|png|jpeg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: false,    // 打包之后js放置在那里 body header false不引入打包后的js
        chunks: ['main'],
        title: `${environment.title}`,
        publicURL: '//assert.ruoru.me',
      }),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(`${environment.key}`),
          'GATEWAY_ENV': JSON.stringify(`${environment.key}`),
        },
      }),

      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
      }),

      new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
      open: true,
      inline: true,
      publicPath: '/',
      contentBase: resolve(__dirname, '../dist'),
      compress: true,    //启用所有服务的gzip压缩
      // https: true,
      host: 'localhost',
      port: 8101,
      historyApiFallback: {
        index: '/index.html',
      },

      //lazy: true,    //当lazy启用时，当它被请求的DEV-服务器将只编译软件包。这意味着webpack不会看到任何文件更改。我们称这个懒惰模式。
      //filename: '[name].bundle.js',    ///[name].bundle.js请求时才编译 。filename在没有延迟模式的情况下使用时不起作用。
    },
  }
};