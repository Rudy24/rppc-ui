module.exports = {
  transpileDependencies: true,
  publicPath: './',
  chainWebpack: (config) => {
    config.entry('app').clear().add('./examples/main.js')
  },
  devServer: {
    proxy: {
      '/easymock': {
        target: 'http://10.12.12.81:7300/mock/60d5d5fa3f73a61f21b57aba/fontend',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/easymock': '/'
        }
      }
    }
  }
}
