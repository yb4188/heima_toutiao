/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-11 12:39:36
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-11 12:45:15
 * @FilePath: \vue_project-m\toutiao-m\src\utils\storeage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//封装存储操作模块

const setData = (key, value)=> {
    if(typeof value == 'object'){
        value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
}

const getData = (key) => {
    const data = localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

const delData = (key)=>{
    localStorage.clear(key)
}

export {
    setData,
    getData,
    delData
}