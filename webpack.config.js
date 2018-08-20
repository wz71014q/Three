const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  // __dirname是一个node全局变量，总是指向被执行文件的绝对路径: 在 /d1/d2/myscript.js 文件中写了 __dirname，它的值就是 /d1/d2
  entry: __dirname + '/app/main.js',
  output: {
    path: __dirname + '/dist', // 打包后的文件存放的地方
    filename: 'bundle-[hash].js'// 打包后输出文件的文件名
  },
  devtool: 'cheap-module-eval-source-map', // source-map -- cheap-module-source-map -- eval-source-map -- cheap-module-eval-source-map 慢=>快
  devServer: {
    contentBase: './public', // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true, // 实时刷新
    port: 3003, // 端口
    open: true, // 开启浏览器
    hot: true   // 开启热更新
  },
  module: {
    rules: [
      // test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
      // loader：loader的名称（必须）
      // include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
      // query：为loaders提供额外的设置选项（可选）
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true, // 指定使用CSS modules
              localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
            }
          },
          {
            loader: 'postcss-loader' // 为CSS代码自动添加适应不同浏览器的CSS前缀
          }
        ]
      }
    ]
  },
  plugins: [
    // HtmlWebpackPlugin依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()// 热加载插件，修改组件代码后，自动刷新实时预览修改后的效果。
  ],
};
