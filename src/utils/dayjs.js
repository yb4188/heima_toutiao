/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-13 21:39:59
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-13 21:54:18
 * @FilePath: \vue_project-m\toutiao-m\src\utils\dayjs.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import dayjs from "dayjs";
//dayjs默认是英文
import 'dayjs/locale/zh-cn'

import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

Vue.filter('relativeTime', value=>{
    return dayjs().to(dayjs(value))
})

dayjs.locale('zh-cn')
