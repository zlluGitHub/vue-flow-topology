
// const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') { // 去掉console.log
  //     config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
  //     config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
  //   }

  //   if (process.env.NODE_ENV === 'production') {
  //     return {
  //       plugins: [
  //         new CompressionPlugin({
  //           test: /\.js$|\.html$|\.css/, //匹配文件名
  //           threshold: 10240,//对超过10k的数据压缩
  //           deleteOriginalAssets: false //不删除源文件
  //         })
  //       ]
  //     }
  //   }
  // },
  // 根域上下文目录
  // publicPath: '/topology', // publicPath:'/rm', 这里可以设置二级文件夹作为主页面

  // devServer: {
  //   port: 8080,
  //   // sockHost: 'http://127.0.0.1',
  //   // disableHostCheck: true,
  //   // open: true,
  //   // host: "localhost",
  //   proxy: {
  //     '/piflow': {
  //       target: ' ',
  //       changeOrigin: true,
  //       ws: true, // 是否启用websockets
  //       secure: false, // 使用的是http协议则设置为false，https协议则设置为true
  //       pathRewrite: {
  //         '^/piflow': '/'
  //       }
  //     }
  //   },
  // },
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  lintOnSave: false,   // 取消 eslint 验证

}