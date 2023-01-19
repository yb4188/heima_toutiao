<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-20 18:27:56
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-21 15:19:30
 * @FilePath: \vue_project-m\toutiao-m\src\views\article\component\commentReply.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <van-nav-bar
      :title="comment.reply_count ? `${comment.reply_count}条回复` : `暂无回复`"
    ></van-nav-bar>
    <div class="scroll-warp">
      <!-- 回复评论组件复用 -->
      <commentDetail :commentItems="comment"></commentDetail>
      <!-- 回复评论组件复用 -->
      <!-- 下方回复组件 -->
      <van-cell title="全部回复" />
      <commentList :source="comment.com_id" type="c"></commentList>
      <!-- 下方回复组件 -->
    </div>
    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" @click="show = true" size="small" round
        >写评论</van-button
      >
    </div>
    <!-- 发布评论 -->
    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom">
      <commentPost
        :target="comment.com_id"
        :art_id="art_id"
        :list="commentList"
        @post-success="onPostSuccess"
      ></commentPost>
    </van-popup>
    <!-- 弹出层 -->
  </div>
</template>

<script>
import commentDetail from "./commentDetail.vue";
import commentList from "../../../components/comment";
import commentPost from "./commentPost.vue";
export default {
  name: "commentReply",
  data() {
    return {
      show: false,
      commentList: []
    };
  },
  props: ["comment"],
  components: { commentDetail, commentList, commentPost },
  inject: ["art_id"],
  methods: {
    onPostSuccess(data){
      // eslint-disable-next-line vue/no-mutating-props
      this.comment.reply_count++
      this.show = false
      this.commentList.unshift(data.new_obj)
    }
  },
};
</script>

<style scoped lang="less">
.scroll-warp {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>