const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, '../frontapp'),
    entry: {
        app: './src/app.js',
    },
    // context: path.resolve(__dirname, 'frontapp'),
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
    plugins: []
};



