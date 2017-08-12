'use strict';
const {
    resolve
} = require('path');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'demo': [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://127.0.0.1:10002/',
            'webpack/hot/only-dev-server',
            './example/index.js'
        ]
    },
    output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        path: resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        contentBase: [path.join(__dirname,'demo'), path.join(__dirname, 'dist')],
        compress: true,
        port: 10002,
        host: '0.0.0.0',
        hot: true,
        inline: true,
        publicPath: '/dist/',
        headers: {
            'XM-Component-Server': 'webpack-dev-server@2.0.0'
        },
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/.*$/,
                    to: '/dist/index.html'
                }
            ],
            verbose: true
        },
        watchContentBase: true
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:[{
                    loader: 'babel-loader',
                    options: {
                        'presets': [
                            ['es2015', {
                                'modules': false
                            }], 'stage-0', 'react'
                        ],
                        'env': {},
                        'ignore': [
                            'node_modules/**',
                            'dist'
                        ],
                        'plugins': [
                            'react-hot-loader/babel',
                            'transform-decorators-legacy'
                        ]
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/i,
                use: ['url-loader']
            }
        ]
    },
    externals: {
        jquery: 'jQuery',
        lodash: '_'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title:'test',
            template:"example/tpl.ejs",
            inject:false
        })
    ]
};
