// 开发配置文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');

const devWebpckConfig = merge(baseWebpackConfig, {
  // 这里是开发模式对应的配置
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      // 开发环境下的接口地址
      // 变量后面的值，是一段代码片段
      API_BASE_URL: JSON.stringify('http://apidev.example.com'),
    }),
    // 打包几个html就new几个
    new HtmlWebpackPlugin({
      // 用来指定生成html模版
      template: './src/index.ejs',
      // 指定打包后的文件名称
      filename: 'index.html',
      title: '首页',
    }),
    new HtmlWebpackPlugin({
      // 用来指定生成html模版
      template: './src/index.ejs',
      // 指定打包后的文件名称
      filename: 'aboutUs.html',
      title: '关于我们',
    }),
  ]
})

module.exports = devWebpckConfig