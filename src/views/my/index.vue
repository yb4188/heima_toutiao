<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-11 13:31:03
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-21 18:19:47
 * @FilePath: \vue_project-m\toutiao-m\src\views\my\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="my-container">
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image round class="avatar" :src="userInfo.photo" fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>

        <div class="right">
          <van-button size="mini" round to="/user/compile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" class="mobile-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link class="md9" />
    </van-cell-group>
    <van-cell
      title="退出登录"
      class="layout-cell"
      v-if="user"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo} from "@/api/user.js";
export default {
  name: "myIndex",
  data() {
    return {
      userInfo: "",
      
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: "是否退出登录",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {});
    },
  },
  async created() {
    try {
      if (this.user) {
        const { data } = await getUserInfo();
        this.userInfo = data.data;
      }
    } catch (error) {
      this.$dialog.alert({
        title: "获取失败 请稍后重试",
      });
    }
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("../../assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132ox;
        margin-bottom: 15px;
      }
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      //height: 130px;
      display: flex;
      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #eb5253;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .layout-cell {
    text-align: center;
    color: #d86262;
  }
  .md9 {
    margin-bottom: 9px;
  }
}
</style>