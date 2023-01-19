<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-19 16:11:43
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-19 17:17:02
 * @FilePath: \vue_project-m\toutiao-m\src\components\isCollect\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-icon
    color="yellow"
    :name="value ? 'star' : 'star-o'"
    @click="isCollect"
    :loading="loading"
  />
</template>

<script>
import { collectArticle, delCollectArticle } from "../../api/user";
export default {
  name: "isCollect",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    //收藏
    async isCollect() {
      this.loading = true;
      try {
        if (this.value) {
          //取消收藏
          await delCollectArticle(this.art_id);
          this.$emit("updateCollected", !this.value);
        } else {
          //点击收藏
          await collectArticle(this.art_id);
          this.$emit("updateCollected", !this.value);
        }
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
      } catch (error) {
        alert(error);
      }
      this.loading = false;
    },
  },
  props: ["value", "art_id"],
};
</script>

<style scoped lang="less">
</style>