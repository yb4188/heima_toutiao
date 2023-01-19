<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-13 20:21:23
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-18 13:47:48
 * @FilePath: \vue_project-m\toutiao-m\src\components\text-item\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-cell class="textItem" :to="`/article/${list.art_id}`">
    <div slot="title" class="title van-multi-ellipsis--l2" >{{ list.title }}</div>
    <div slot="label" class="label-info">
      <div>
        <span>{{ list.aut_name }}</span>
        <span>{{ list.comm_count }}评论</span>
        <span>{{ list.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      :src="list.cover.images[0]"
      slot="default"
      class="right-cover"
      fit="cover"
      v-if="list.cover.type === 1"
    />
    <div v-if="list.cover.type === 3" slot="label" class="cover-warp">
      <div v-for="(img, index) in list.cover.images" :key="index" class="cover-item">
        <van-image :src="img" fit="cover" class="imgList"/>
      </div>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: "textItem",
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
.textItem {
  .title {
    font-size: 32px;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info span{
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
  }
  .cover-warp{
      display: flex;
      padding: 30px 0;
    .cover-item{
        flex: 1;
        height: 146px;
        &:not(:last-child){
            padding-right: 4px;
        }
        .imgList{
            width: 100%;
            height: 146px;
        }
    }
  }
}
</style>