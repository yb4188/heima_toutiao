<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-16 20:10:23
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-17 17:34:47
 * @FilePath: \vue_project-m\toutiao-m\src\views\search\component\searchHistroy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="historyContainer">
    <van-cell title="搜索历史">
      <div v-if="isShow">
        <span @click="$emit('clearSearchHistorys')">全部删除</span>
        &nbsp;
        <span @click="isShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isShow = true" />
    </van-cell>
    <van-cell
      :title="title"
      v-for="(title, index) in searchHistorys"
      :key="index"
      @click="$emit('search', title)"
    >
      <van-icon name="close" @click="deleteThis(title, index)" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "searchHistory",
  props: ["searchHistorys"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    deleteThis(title, index) {
      //删除当前历史记录
      // eslint-disable-next-line vue/no-mutating-props
      this.searchHistorys.splice(index, 1);
    },
  },
};
</script>

<style>
</style>