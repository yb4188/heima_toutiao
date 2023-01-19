<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-20 13:29:49
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-21 14:23:03
 * @FilePath: \vue_project-m\toutiao-m\src\views\article\component\commentDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentItems.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commentItems.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="commentItems.is_liking ? 'good-job' : 'good-job-o'"
        @click="onLiked"
        >{{ commentItems.like_count || "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ commentItems.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          commentItems.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click', commentItems)"
          >回复 {{ commentItems.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLiked, delCommentLiked } from "../../../api/user";
export default {
  name: "CommentItem",
  components: {},
  props: ["commentItems"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //点赞
    async onLiked() {
      try {
        if (this.commentItems.is_liking) {
          //取消点赞
          const { data } = await delCommentLiked(this.commentItems.com_id);
          console.log(data);
          // eslint-disable-next-line vue/no-mutating-props
          this.commentItems.like_count--;
        } else {
          //进行点赞
          await addCommentLiked(this.commentItems.com_id);
          // eslint-disable-next-line vue/no-mutating-props
          this.commentItems.like_count++;
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.commentItems.is_liking = !this.commentItems.is_liking;
      } catch (error) {
        this.$toast("失败重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
