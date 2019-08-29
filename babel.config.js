/*
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors: GerhardYang
 * @LastEditTime: 2019-08-29 21:44:26
 */
const plugins = [];
if(['production', 'prod'].includes(process.env.NODE_ENV)) { 
 plugins.push("transform-remove-console")
}

module.exports = {
 presets: [["@vue/app",{"useBuiltIns": "entry"}]],
 plugins: plugins
};
