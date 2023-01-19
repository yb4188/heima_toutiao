/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-09 13:24:38
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-13 21:44:07
 * @FilePath: \vue_project-m\toutiao-m\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'

//import router from "@/router/index"
import router from "@/router/index"

//导入全局样式
import './style/index.less'

//导入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';

//加载动态设置REM基准值
import "amfe-flexible"

//引入vuex
import store from "@/store"

//引入dayjs
import "./utils/dayjs"

//使用vant插件
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  el:"#app",
  render: h => h(App),
  router,
  store
})

