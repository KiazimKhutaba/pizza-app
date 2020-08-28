const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../public'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './src/assets', to: 'assets' },
                { from: './src/style', to: 'css' },
                { from: './src/favicon.ico', to: 'favicon.ico' },
                { from: './src/index.html', to: path.resolve(__dirname, '../views') }
            ],
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',
        //     output: ,
        // }),
    ]
});