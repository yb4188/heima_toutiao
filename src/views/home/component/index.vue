<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-12 15:12:47
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-13 20:26:40
 * @FilePath: \vue_project-m\toutiao-m\src\views\home\component\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="textList">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <textItem v-for="(list, index) in list" :key="index" :list="list"></textItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { contentInfo } from "../../../api/user";
import textItem from "../../../components/text-item/index.vue";
export default {
  name: "contentList",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshing: false,
    };
  },
  components: { textItem },
  props: {
    channels: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 加载状态结束
      // 数据全部加载完成
      try {
        const { data } = await contentInfo({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now(),
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
      }
    },
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },

    //下拉刷新
    async onRefresh() {
      try {
        const { data } = await contentInfo({
          channel_id: this.channels.id,
          timestamp: Date.now(),
        });
        const { results } = data.data;
        this.list.unshift(...results);
        this.refreshing = false;
        this.onLoad();
      } catch (error) {
        this.error = true;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped lang='less'>
.textList {
  height: 79vh;
  overflow-y: auto;
}
</style>