module.exports = {
  transpileDependencies: true,
  pages: {
    index: {
      // 修改入口
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: (config) => {
    // config.resolve
    //   .merge(['.js', '.vue', 'json'])
    //   .end();
    config.module
      .rule('js')
      .include.add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => options)
  }
}
