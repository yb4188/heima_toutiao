<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-22 12:54:58
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-22 13:26:51
 * @FilePath: \vue_project-m\toutiao-m\src\views\userCompile\components\userGender.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="updateGender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserName } from "../../../api/user";
export default {
  name: "userGender",
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
    };
  },
  props: ["value"],
  methods: {
    async onConfirm() {
      //确认
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁止点击背景
        duration: 0,
      });
      try {
        await updateUserName({
          gender: this.localGender,
        });
        //更新视图
        this.$emit("input", this.localGender);
        //关闭弹层
        this.$emit("close");
        //提示成功
        this.$toast.success("修改成功");
      } catch (error) {
        this.$toast("修改失败,请稍后重试");
      }
    },
    onChange(picker, value, index) {
      this.localGender = index;
    },
  },
};
</script>

<style>
</style>