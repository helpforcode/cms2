module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        // @/ 是 src/ 的别名
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        // https://www.jianshu.com/p/6ea3339c6579
        additionalData: ` 
                @import "@nutui/nutui/dist/styles/index.scss";
                `,
      }
    },
  },
  devServer: {
    // host: 'localhost',
    // port: 8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
