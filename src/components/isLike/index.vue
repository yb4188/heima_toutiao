<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-19 16:43:52
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-19 17:15:21
 * @FilePath: \vue_project-m\toutiao-m\src\components\isLike\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-icon
    color="red"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="isLike"
    :loading="loading"
  />
</template>

<script>
import { isLiked, cancelLiked } from "../../api/user";
export default {
  name: "isLiked",
  data() {
    return {
      loading: false,
    };
  },
  props: {
      value: {
          type:Number,
          required:true
      },
      art_id: {
          type:[Number, String, Object],
          required: true
      }
  },
  methods: {
    async isLike() {
      this.loading = true;
      try {
        let status = -1;
        if (this.value === 1) {
          //取消点赞
          await cancelLiked(this.art_id);
        } else {
          //点赞
          await isLiked(this.art_id);
          status = 1;
        }
        this.$emit("updateIsLike", status);
        this.$toast.success(status == 1 ? "点赞成功" : "取消点赞");
      } catch (error) {
        alert(error);
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>