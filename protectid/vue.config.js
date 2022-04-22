// Fix bug
// vue.config.js
module.exports = {
    devServer: {
        proxy: 'http://localhost:8080/',
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