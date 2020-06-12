const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const header = require('./src/meta/header');


// https://softwarerecs.stackexchange.com/questions/38274/module-bundler-for-typescript-in-greasemonkey
module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: 'ytma.user.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.BannerPlugin({
            raw: true,
            banner: header,
            // entryOnly: true
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: false,
                extractComments: false,
                terserOptions: {
                    mangle: false,
                    output: {
                        comments: "some"
                    },
                    compress: {
                        module: true,
                    }
                },
            })
        ]
    }
};