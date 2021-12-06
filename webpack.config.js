const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        publicPath: "/",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx','.ts','.tsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./src/index.css",
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            inject: true,
            filename: path.resolve(__dirname, './dist/index.html')
        })

    ],
    mode: "development",
    devServer: {
        port: 9000
    }
    // devtool: "inline-source-map",
    // devServer: {
    //     port: 9000,
    //     hot: true,
    //     publicPath: 'index.html',
    // },
};
