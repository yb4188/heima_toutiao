/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-09 19:00:07
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-18 20:20:06
 * @FilePath: \vue_project-m\toutiao-m\.postcss.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    plugins: {
      'postcss-pxtorem': {
        //rootValue: 37.5,
        rootValue({file}){
          return file.indexOf("vant") !== -1 ? 37.5 : 75
        },
        propList: ['*'],
        exclude:'github-markdown-light'
      },
    },
  };