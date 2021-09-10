const { resolve } = require('path');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { assert } = require('console');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@templates': path.resolve(__dirname, 'src/templates'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css|s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: '[name].[contenthash].[ext]',
                        outputPath: './assets/fonts/',
                        publicPath: '../assets/fonts/',
                        esModule: false,
                    },
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
    optimization: {
        minimize:true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
}