<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-19 15:00:03
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-19 15:21:24
 * @FilePath: \vue_project-m\toutiao-m\src\components\focusOnUser\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-button
    v-if="userFollow"
    :loading="loading"
    class="follow-btn"
    round
    size="small"
    @click="focusOnUser"
    >已关注</van-button
  >

  <van-button
    v-else
    :loading="loading"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="focusOnUser"
    >关注</van-button
  >
</template>

<script>
import {followUser, deleteFollowUser} from '../../api/user'
export default {
  name: "focusOnUser",
  data() {
    return {
      loading: false,
      message:'信息错误, 请稍后重试'
    };
  },
  props:['art_id','userFollow'],
  methods: {
    //关注用户
    async focusOnUser() {
      this.loading = true;
      if (this.userFollow) {
        //表示关注用户 进行取消关注
        try {
          await deleteFollowUser(this.art_id);
          this.$emit('updateArticleAtuId',!this.userFollow)
        } catch (error) {
          alert(error);
        }
      } else {
        //表示未关注 进行关注
        try {
          await followUser(this.art_id);
          this.$emit('updateArticleAtuId',!this.userFollow)
        } catch (error) {
          if (error.response.status == 400) {
            this.message = error.response.data.message;
          }
          alert(this.message);
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>