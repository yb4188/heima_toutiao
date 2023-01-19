/* eslint-disable vue/no-mutating-props */
<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-14 12:59:31
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-14 21:18:29
 * @FilePath: \vue_project-m\toutiao-m\src\components\channelEdit\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 我的频道 -->
  <div class="channel-Edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        @click="isEdit = !isEdit"
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        class="grid-item"
        @click="onChannelsClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexChannels.includes(channel.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          channel.name
        }}</span></van-grid-item
      >
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommed-grid">
      <van-grid-item
        icon="plus"
        v-for="(channel, index) in recommednChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        @click="addChannels(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "../../api/user";
import { mapState } from "vuex";
import { setData } from "../../utils/storeage";
export default {
  name: "channelEdit",
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0],
    };
  },
  props: ["myChannels", "active"],
  created() {
    this.getAllchannelsList();
  },
  methods: {
    async getAllchannelsList() {
      try {
        const res = await getAllChannels();
        this.allChannels = res.data.data.channels;
      } catch (error) {
        alert(error.message);
      }
    },

    //添加频道
    async addChannels(channel) {
      // eslint-disable-next-line vue/no-mutating-props
      this.myChannels.push(channel);

      //数据持久化处理
      if (this.user) {
        //登录调用接口存储
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length,
          });
        } catch (error) {
          alert(error.message);
        }
      } else {
        //未登录利用本地存储
        setData("TOUTIAO_channel", this.myChannels);
      }
    },

    //频道点击
    async onChannelsClick(channel, index) {
      if (this.isEdit) {
        //编辑状态 执行删除频道
        if (this.fiexChannels.includes(channel.id)) {
          return;
        }
        if (index <= this.active) {
          this.$emit("updateActive", this.active - 1, true);
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.myChannels.splice(index, 1);
      } else {
        //非编辑状态 执行切换频道
        this.$emit("updateActive", index, false);
      }

      if (this.user) {
        try {
          await deleteUserChannel(channel.id);
        } catch (error) {
          alert(error.message);
        }
      }else{
          setData("TOUTIAO_channel", this.myChannels)
      }
    },
  },
  computed: {
    recommednChannels() {
      const channels = [];
      this.allChannels.forEach((channel) => {
        const ret = this.myChannels.find((myChannel) => {
          return channel.id === myChannel.id;
        });

        if (!ret) {
          channels.push(channel);
        }
      });
      return channels;
    },

    ...mapState(["user"]),
  },
};
</script>

<style scoped lang="less">
.channel-Edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-style: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/.recommed-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>