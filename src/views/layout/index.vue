<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-11 13:16:21
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-11 19:46:43
 * @FilePath: \vue_project-m\toutiao-m\src\router\layout\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <router-view> </router-view>
    <!-- 公共部分 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i
        ><span class="text">问答</span></van-tabbar-item
      >
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i
        ><span class="text">视频</span></van-tabbar-item
      >
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i
        ><span class="text">{{$store.state.user?'我的':'未登录'}}</span></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layoutIndex",
};
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>