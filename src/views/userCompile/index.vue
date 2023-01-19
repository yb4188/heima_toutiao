<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-21 18:16:11
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-22 19:29:53
 * @FilePath: \vue_project-m\toutiao-m\src\views\userCompile\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="userCompile">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 头部导航栏 -->
    <!-- 上传头像 -->
    <input type="file" hidden ref="filePhoto" @change="onFileChange" />
    <!-- 上传头像 -->
    <!-- 个人信息编辑部分 -->
    <van-cell title="头像" is-link @click="$refs.filePhoto.click()">
      <van-image class="profile" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="性别"
      :value="user.gender == 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />
    <!-- 个人信息编辑部分 -->
    <!-- 编辑昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <userName
        @close="isUpdateNameShow = false"
        v-model="user.name"
        @input="user.name = $event"
      ></userName>
    </van-popup>
    <!-- 编辑昵称弹出层 -->
    <!-- 编辑性别弹出层 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <userGender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
      ></userGender>
    </van-popup>
    <!-- 编辑性别弹出层 -->
    <!-- 编辑生日弹出层 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <userBrithday
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
        v-model="user.birthday"
      ></userBrithday>
    </van-popup>
    <!-- 编辑生日弹出层 -->
    <!-- 编辑头像弹出层 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <userPhoto
        :img="photo"
        @close="isUpdatePhotoShow = false"
        @updatePhoto="user.photo = $event"
        v-if="isUpdatePhotoShow"
      ></userPhoto>
    </van-popup>
    <!-- 编辑头像弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from "../../api/user";
import userName from "./components/userName.vue";
import userGender from "./components/userGender.vue";
import userBrithday from "./components/userBrithday.vue";
import userPhoto from "./components/userPhoto.vue";
export default {
  name: "userCompile",
  data() {
    return {
      user: [],
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      photo: null,
    };
  },
  methods: {
    //获取真实个人信息
    async userProfile() {
      try {
        const { data } = await getUserProfile();
        this.user = data.data;
      } catch (error) {
        this.$toast("获取失败,请稍后重试");
      }
    },

    //编辑头像
    onFileChange() {
      //获取文件对象
      const file = this.$refs.filePhoto.files[0];
      //基于文件对象获取 blob 数据
      this.photo = window.URL.createObjectURL(file);
      this.isUpdatePhotoShow = true;
      this.$refs.filePhoto.value = "";
    },
  },
  created() {
    this.userProfile();
  },
  components: { userName, userGender, userBrithday, userPhoto },
};
</script>

<style scoped lang="less">
.userCompile {
  .profile {
    height: 60px;
    width: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>