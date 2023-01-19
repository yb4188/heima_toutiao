/* eslint-disable no-unused-vars */
/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-10 18:34:18
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-22 19:11:17
 * @FilePath: \vue_project-m\toutiao-m\src\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";
import store from '@/store/index'

//登录接口
export const login = (data) => {
    return request({
        url: "/v1_0/authorizations",
        method: "post",
        data
    })
}

//获取验证码接口
export const sendSms = (mobile) => request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: "get"
})


//获取个人信息的接口
export const getUserInfo = () => request({
    url: '/v1_0/user/',
    method: 'get'

})

//获取主页列表接口
export const channelsInfo = () => request({
    url: '/v1_0/user/channels',
    method: 'get'
})


//获取频道内信息
export const contentInfo = (params) => request({
    url: '/v1_0/articles',
    method: 'get',
    params
})


//获取所有频道列表
export const getAllChannels = () => request({
    url: '/v1_0/channels',
    method: 'get'
})

//添加用户频道
export const addUserChannel = (channel) => request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
        channels: [channel]
    }
})

//删除指定用户频道
export const deleteUserChannel = (channel) => request({
    url: `/v1_0/user/channels/${channel}`,
    method: 'DELETE',
})


//获取联想建议结果
export const getAssociateSuggestions = (q)=> request({
    url:'/v1_0/suggestion',
    method:'get',
    params: {
        q
    }
})

//获取搜索结果
export const getSearchResult = (params)=>request({
    url:'/v1_0/search',
    method:'get',
    params
})

//获取文章详情
export const getArticleById = (articleId)=>request({
    url:`/v1_0/articles/${articleId}`,
    method:'get'
})

//关注用户
export const followUser = (target)=> request({
    url:'/v1_0/user/followings',
    method:'post',
    data: {
        target
    }
})

//取消关注用户
export const deleteFollowUser = (art_id)=> request({
    url:`/v1_0/user/followings/${art_id}`,
    method:'delete',
})

//收藏
export const collectArticle = (target)=> request({
    url:`/v1_0/article/collections`,
    method:'post',
    data: {
        target
    }
})

//收藏
export const delCollectArticle = (target)=> request({
    url:`/v1_0/article/likings/${target}`,
    method:'delete',
})

//点赞
export const isLiked = (target)=> request({
    url:'/v1_0/article/likings',
    method:'post',
    data: {
        target
    }
})

//取消点赞
export const cancelLiked = (target)=> request({
    url:`/v1_0/article/likings/${target}`,
    method:'delete',
})
    
//获取文章评论
export const getCommentList = (params)=>request({
    url:'/v1_0/comments',
    method:'get',
    params
})

//评论点赞
export const addCommentLiked = (target)=>request({
    url:'/v1_0/comment/likings',
    method:'post',
    data: {
        target
    }
})

//取消点赞
export const delCommentLiked = (target)=>request({
    url:`/v1_0/comment/likings/${target}`,
    method:'delete',
    
})

//发布评论
export const onPostComment = (data)=>request({
    url:'/v1_0/comments',
    method:'post',
    data
})

//编辑个人信息
export const getUserProfile = ()=>request({
    url:'/v1_0/user/profile',
    method:'get'
})

//编辑昵称
export const updateUserName = (data)=>request({
    url:'/v1_0/user/profile',
    method:'patch',
    data
})

//编辑用户头像
export const updateUserPhoto = (data)=>request({
    url:'/v1_0/user/photo',
    method:'patch',
    data
})