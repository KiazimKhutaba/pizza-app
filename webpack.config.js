const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, 'webapp/app.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    // style-loader
                    { loader: 'style-loader' },
                    // css-loader
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    // // sass-loader
                    // { loader: 'sass-loader' }
                ]
            },
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // new HtmlWebpackPlugin({
        //     template: 'index.html'
        // }),
        new CopyPlugin({
            patterns: [
                { from: 'webapp/assets', to: 'assets' },
                { from: 'webapp/favicon.ico', to: 'favicon.ico' }
            ],
        }),
    ]
};
