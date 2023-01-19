<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-20 17:13:02
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-21 15:26:51
 * @FilePath: \vue_project-m\toutiao-m\src\views\article\component\commentPost.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { onPostComment } from "../../../api/user";
export default {
  name: "CommentPost",
  components: {},
  props: {
    target: {
      type: [String, Number, Object],
      required:true
    },
    list: {
      type:Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //发送评论
    async onPost() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await onPostComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id,
        });
        this.message = "";
        this.$emit("post-success", data.data);
        console.log(data.data);
        this.$toast.success("发送成功");
      } catch (error) {
        this.$toast.fail("发送失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
