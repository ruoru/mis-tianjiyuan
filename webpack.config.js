const { join } = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const environment = require('./config/environment')[process.env.env];
const version = require('./package').version;

module.exports = {
    entry: {
        app: './src/main.jsx',
    },
    output: {
        path: join(__dirname, './dist'),
        filename: `./js/[name]-v${version}.js`,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM',
    // },
    module: {
        loaders: [
            //处理jsx文件
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],  //不通过该babel处理，提高打包速度。
                include: [/src/],           //指定打包范围
                query: {
                    presets: ['react', 'env'],    //指定最后一个版本
                },
            },
            //处理css文件
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader. 在css-loader之后，指定几个loader处理import的css
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                //require('autoprefixer')
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.(jpg|png|jpeg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 100000,    //设定最小值，小于最小值可图片被打包成dataURL base64编码
                            name: 'image/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
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
            chunks: ['app'],
            title: `${environment.title}`,
            publicURL: '//assert.tianjiyuan.ltd',
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': `'${environment.name}'`,
            }
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

    ],
    devServer: {
        open: true,
        contentBase: join(__dirname, './dist'),
        compress: true,    //启用所有服务的gzip压缩
        host: 'localhost',
        port: 8001,

        //lazy: true,    //当lazy启用时，当它被请求的DEV-服务器将只编译软件包。这意味着webpack不会看到任何文件更改。我们称这个懒惰模式。
        //filename: '[name].bundle.js',    ///[name].bundle.js请求时才编译 。filename在没有延迟模式的情况下使用时不起作用。
    },
};