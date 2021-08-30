// 公共配置文件
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
// eslint插件
const ESlintPlugin = require('eslint-webpack-plugin');
// 不需要特殊处理的文件
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 通用的样式loader
const commonStyleLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../', // 为背景图片指定路径
    },
  },
  'css-loader',
  'postcss-loader',
];

module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 出口文件
  output: {
    // 输出路径（输出路径必须是绝对路径）
    path: resolve(__dirname, '../dist'),
    // 输出文件名称
    filename: 'main.js',
    clean: true,
  },

  // 模块的配置
  module: {
    rules: [
      // 指定多个配置规则
      {
        test: /\.css$/i,
        // 通过postcss-loader给样式属性添加浏览器前缀
        use: [...commonStyleLoader],
      },
      {
        test: /\.less$/i,
        use: [
          ...commonStyleLoader,
          'less-loader',
        ],
      },
      // 处理图片
      {
        test: /\.(png|gif|jpe?g)$/i,
        // 使用资源模块
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'image/[name][ext]',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', {
                  // 按需加载
                  useBuiltIns: 'usage',
                  // core-js版本
                  corejs: 3,
                  targets: 'defaults',
                },
              ],
            ],
          },
        },
      },
      // 匹配字体文件
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        // 使用资源模块处理字体文件
        // asset可以在asset/resource和asset/inline之间进行选择
        // 如果文件小于8kb，则使用asset/inline类型
        // 如果文件大于8kb，则使用asset/resource类型
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },

  // 开发服务器
  devServer: {
    // 启动服务后会自动打开浏览器
    open: true,
    // 指定加载内容的路径
    contentBase: resolve(__dirname, 'dist'),
    // 启用gzip压缩
    compress: true,
    // 端口号
    port: 8080,
    //  启动自动更新 （禁用hot）
    liveReload: true,

    // 配置代理：解决接口跨域问题
    proxy: {
      // http://localhost:8080/api
      '/api': {
        // http://localhost:8080/api/users => https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:8080/api/users => https://api.github.com/users
        pathRewrite: {
          '^/api': '',
        },
        // 不能使用localhost:8080作为github的主机名
        changeOrigin: true,
      },
    },
  },

  // web模式才用热更新
  target: 'web',

  // 插件
  plugins: [
    // 样式lint规则
    new StylelintPlugin({
      // 指定需要进行格式校验文件
      files: ['src/*.{css, less, sass}'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new ESlintPlugin({
      // 自主解决常规的eslint报错
      fix: true,
    }),
    // 不需要特殊处理的文件，直接复制到输出目录中
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/public',
          to: 'public',
        },
      ],
    }),
  ],

  // 解析路径
  resolve: {
    alias: {
      assets: resolve(__dirname, 'src/assets'),
    },
  },
}