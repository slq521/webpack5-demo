// 生产配置文件
// 压缩html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');

const prodWebpckConfig = merge(baseWebpackConfig, {
  // 这里是开发模式对应的配置
  mode: 'production',
  // 启用source-map定位问题
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      // 开发环境下的接口地址
      // 变量后面的值，是一段代码片段
      API_BASE_URL: JSON.stringify('http://apipro.example.com'),
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin(),
    // 打包几个html就new几个
    new HtmlWebpackPlugin({
      // 用来指定生成html模版
      template: './src/index.ejs',
      // 指定打包后的文件名称
      filename: 'index.html',
      title: '首页',
      // 压缩
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      // 用来指定生成html模版
      template: './src/index.ejs',
      // 指定打包后的文件名称
      filename: 'aboutUs.html',
      title: '关于我们',
      // 压缩
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ]
})

module.exports = prodWebpckConfig