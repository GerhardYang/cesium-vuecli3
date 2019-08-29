/*
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors: GerhardYang
 * @LastEditTime: 2019-08-29 20:07:55
 */
module.exports = {
  publicPath: './',

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: []
    }
  },

  productionSourceMap: false,

  css: {
    extract: false
  }
}
