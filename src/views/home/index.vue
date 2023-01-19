<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-11 13:31:32
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-15 16:21:13
 * @FilePath: \vue_project-m\toutiao-m\src\views\home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-container">
    <!-- 搜索栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        size="small"
        round
        icon="search"
        class="search-btn"
        to="/search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 标签栏 -->
    <van-tabs class="channle-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channels.name"
        v-for="channels in channelsInfo"
        :key="channels.id"
      >
        <list :channels="channels"></list>
      </van-tab>
      <div slot="nav-right" class="hanburger-btn" @click="show = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-cell is-link>展示弹出层</van-cell>
    <van-popup
      v-model="show"
      close-icon-position="top-left"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channelEdit
        :myChannels="channelsInfo"
        :active="active"
        @updateActive="onUpdateActive"
      ></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import list from "./component/index.vue";
import { channelsInfo } from "../../api/user";
import channelEdit from "../../components/channelEdit/index.vue";
import {getData} from '../../utils/storeage'
import {mapState} from 'vuex'
export default {
  name: "homeIndex",
  data() {
    return {
      active: 0,
      channelsInfo: [],
      show: false,
    };
  },
  methods: {
    async getChannelsInfo() {
      try {
        // const { data } = await channelsInfo();
        // this.channelsInfo = data.data.channels;
        let channels = []
        if(this.user){
          const {data} = await channelsInfo()
          channels = data.data.channels
        }else{
          const loaclChannels = getData("TOUTIAO_channel")

          if(loaclChannels){
            channels = loaclChannels
          }else{
            const {data} = await channelsInfo()
            channels = data.data.channels
          }
        }

        this.channelsInfo = channels
      } catch (error) {
        this.$dialog.alert({
          title: "获取失败 请稍后重试",
        });
      }
    },

    // eslint-disable-next-line no-unused-vars
    onUpdateActive(index, is){
      this.active = index
      this.show = is
    }
  },
  created() {
    this.getChannelsInfo();
  },
  components: { list, channelEdit},
  computed: {
    ...(mapState(['user']))
  }
};
</script>

<style scoped lang="less">
.home-container {
  margin-bottom: 100px;
  padding-top: 174px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 450px;
    height: 64px;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/.channle-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      z-index: 1;
      top: 92px;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 200px;
      //height: 82px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .hanburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.9;
      i.iconfont {
        font-size: 33px;
      }
    }
  }
}
</style>