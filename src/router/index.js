/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-09 20:02:22
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-21 18:18:24
 * @FilePath: \vue_project-m\toutiao-m\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    {
        path: '/user/compile',
        name: 'userCompile',
        component: ()=>import('@/views/userCompile'),
        props:true
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: ()=>import('@/views/article'),
        props:true
    },
    {
        path: '/search',
        name: 'search',
        component: ()=>import('@/views/search')
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('@/views/login/index.vue')
    },
    {
        path: '/',
        name: 'layout',
        component: ()=> import('@/views/layout'),
        children: [
            {
                path:"/home",
                name:'home',
                component: ()=>import('@/views/home')
            },
            {
                path:'/my',
                name:'my',
                component: ()=>import('@/views/my')
            },
            {
                path:'/qa',
                name:'qa',
                component: ()=>import('@/views/qa')
            },
            {
                path:'/video',
                name:'video',
                component: ()=>import('@/views/video')
            },
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router