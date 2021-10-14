

//vue-cli的配置
module.exports = {



    publicPath: process.env.NODE_ENV === 'production'
    ? '/demo-keep-alive/'
    : '/',

    //webpack相关配置 将于 内部使用的webpack的预设混合。
    configureWebpack: require("./webpack.config"),

}