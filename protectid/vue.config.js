// vue.config.js
module.exports = {
    devServer: {
        proxy: 'https://api.geretonid.com/',
        disableHostCheck: true,
    },
    configureWebpack: {
        resolve: {
          alias: {
            'vue$': 'vue/dist/vue.esm.js'
          }
        }
      }   
}
