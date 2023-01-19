<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-20 12:43:44
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-21 14:23:04
 * @FilePath: \vue_project-m\toutiao-m\src\components\comment\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="加载失败,请稍后重试"
    :immediate-check="false"
  >
    <commetnItem
      v-for="(item, index) in list"
      :key="index"
      :commentItems="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getCommentList } from "../../api/user";
import commetnItem from "../../views/article/component/commentDetail";
export default {
  name: "commentList",
  data() {
    return {
      //list: [],
      loading: false,
      finished: false,
      limit: 10, //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      offset: null, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        //请求获取数据
        const { data } = await getCommentList({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        });
        //将数据添加到列表中
        const { results } = data.data;
        //将数据传给父组件展示评论数量
        this.$emit("getComment", data.data);
        // eslint-disable-next-line vue/no-mutating-props
        this.list.push(...results);
        //将loading设置为false
        this.loading = false;
        //判断是否还有数据
        if (results.length) {
          //有就更新获取下一页的数据页码
          this.offset = data.data.last_id;
        } else {
          //没有就将finished设置为结束
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "a",
    },
  },
  mounted() {
    this.loading = true;
    this.onLoad();
  },
  components: {
    commetnItem,
  },
};
</script>

<style>
</style>