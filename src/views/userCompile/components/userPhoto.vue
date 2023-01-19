<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-22 17:50:54
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-22 19:28:00
 * @FilePath: \vue_project-m\toutiao-m\src\views\userCompile\components\userPhoto.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="updatePhoto">
    <img :src="img" class="img" ref="img" />

    <div class="toolbar">
      <div class="cancle" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onUpdatePhoto">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "../../../api/user";
export default {
  name: "userPhoto",
  data() {
    return {
      cropper: null,
    };
  },
  props: ["img"],
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: "move",
      //autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  methods: {
    onUpdatePhoto() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁止点击背景
        duration: 0,
      });
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        try {
          const formData = new FormData();
          formData.append("photo", blob /*, 'example.png' */);
          const { data } = await updateUserPhoto(formData);
          //关闭弹窗
          this.$emit("close")
          //更新视图
          this.$emit("updatePhoto", data.data.photo);
          this.$toast.success("更新成功");
        } catch (error) {
          this.$toast.fail("更新失败");
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.updatePhoto {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancle,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  max-width: 100%;
  display: block;
}
</style>