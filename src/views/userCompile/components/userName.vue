<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-21 18:49:04
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-21 19:42:59
 * @FilePath: \vue_project-m\toutiao-m\src\views\userCompile\components\userName.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="updateName">
    <!-- 导航图标 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <!-- 导航图标 -->

    <div class="nameField">
      <!-- 修改输入框 -->
      <van-field
        v-model.trim="updateName"
        rows="2"
        autosize
        type="textarea"
        maxlength="8"
        placeholder="请输入更改后的昵称"
        show-word-limit
      />
      <!-- 修改输入框 -->
    </div>
  </div>
</template>

<script>
import { updateUserName } from "../../../api/user";
export default {
  name: "userName",
  data() {
    return {
      updateName: this.value,
    };
  },
  methods: {
    //点击完成修改昵称
    async onClickRight() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁止点击背景
        duration: 0,
      });
      try {
        if (!this.updateName.length) {
          this.$toast.fail("输入不能为空");
          return;
        }
        await updateUserName({
          name: this.updateName,
        });
        //更新视图
        this.$emit("input", this.updateName);
        //关闭弹层
        this.$emit("close");
        //提示成功
        this.$toast.success("修改成功");
      } catch (error) {
        this.$toast("修改失败,请稍后重试");
      }
    },
  },
  props: ["value"],
};
</script>

<style scoped lang="less">
.updateName {
  .nameField {
    padding-top: 20px;
  }
}
</style>