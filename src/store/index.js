/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-10 21:11:14
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-11 20:01:59
 * @FilePath: \vue_project-m\toutiao-m\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import Vuex from "vuex"
import {getData, setData} from "@/utils/storeage"

Vue.use(Vuex)

const token_key = 'user'

const actions = {}
const mutations = {
    setUser(state, data){
        state.user = data
        setData(token_key, data)
        //localStorage.setItem(token_key, JSON.stringify(data))
    }
}
const state = {
    user: getData(token_key)
    //data: JSON.parse(localStorage.getItem(token_key)) 
}
const getters = {}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
}) 





