<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-18 13:41:39
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-21 14:59:12
 * @FilePath: \vue_project-m\toutiao-m\src\views\article\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="onClickLeft"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>

          <!-- 用户关注 -->
          <focesOnUser
            class="follow-btn"
            :art_id="article.aut_id"
            :userFollow="article.is_followed"
            @updateArticleAtuId="article.is_followed = $event"
          ></focesOnUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 底部评论 -->
        <comment
          :source="article.art_id"
          @getComment="commentCount = $event.total_count"
          @reply-click="onReplyClick"
          :list="commentList"
        ></comment>
        <!-- 底部评论 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="commentCount" color="#777" />
          <!-- 收藏 -->
          <isCollect
            v-model="article.is_collected"
            :art_id="article.art_id"
            @updateCollected="article.is_collected = $event"
          ></isCollect>
          <!-- 点赞 -->
          <isLike
            v-model="article.attitude"
            :art_id="article.art_id"
            @updateIsLike="article.attitude = $event"
          ></isLike>

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- 评论栏 -->
        <van-popup v-model="isPostShow" closeable position="bottom">
          <commentPost
            :target="article.aut_id"
            @post-success="onPostSuccess"
          ></commentPost>
        </van-popup>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 回复评论 -->
    <van-popup
      v-model="isReplyShow"
      closeable
      position="bottom"
      :style="{ height: '90%' }"
    >
      <commentReply v-if="isReplyShow" :comment="currentComment"></commentReply>
    </van-popup>
    <!-- 回复评论 -->
  </div>
</template>

<script>
import { getArticleById } from "../../api/user";
import { ImagePreview } from "vant";
import focesOnUser from "../../components/focusOnUser";
import isCollect from "../../components/isCollect";
import isLike from "../../components/isLike";
import comment from "../../components/comment";
import commentPost from "./component/commentPost.vue";
import commentReply from "./component/commentReply.vue";

export default {
  name: "articleIndex",
  data() {
    return {
      article: {},
      loading: true,
      errStatus: "",
      commentCount: 0,
      isPostShow: false,
      commentList: [],
      isReplyShow: false,
      currentComment: {},
    };
  },
  props: ["articleId"],
  components: {
    focesOnUser,
    isCollect,
    isLike,
    comment,
    commentPost,
    commentReply,
  },
  provide: function () {
    return {
      art_id: this.articleId
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      this.loading = true;
      try {
        const { data } = await getArticleById(this.articleId);
        this.article = data.data;

        setTimeout(() => {
          const articleContent = this.$refs["article-content"];
          const imgs = articleContent.querySelectorAll("img");
          const images = [];
          imgs.forEach((img, index) => {
            images.push(img.src);
            img.onclick = () => {
              ImagePreview({
                images,
                startPosition: index,
              });
            };
          });
        }, 0);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
          this.errStatus = error.response.status;
        }
      }
      this.loading = false;
    },

    onClickLeft() {
      this.$router.back();
    },

    onPostSuccess(data) {
      //关闭弹出层
      this.isPostShow = false;
      //将发布内容显示到列表内布
      this.commentList.unshift(data.new_obj);
    },

    onReplyClick(data) {
      //展开弹出层
      this.isReplyShow = true;
      this.currentComment = data;
    },
  },
};
</script>

<style scoped lang="less">
@import url("./github-markdown-light.css");
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
