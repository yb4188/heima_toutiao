<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-22 13:39:43
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-22 13:51:00
 * @FilePath: \vue_project-m\toutiao-m\src\views\userCompile\components\userBrithday.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="userBrithday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="updateBirthday"
    />
  </div>
</template>

<script>
import { updateUserName } from "../../../api/user";
import dayjs from 'dayjs'
export default {
  name: "userBrithday",
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  props: ["value"],
  methods: {
    async updateBirthday() {
      //确认修改
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁止点击背景
        duration: 0,
      });
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserName({
          birthday: currentDate,
        });
        //更新视图
        this.$emit("input", currentDate);
        //关闭弹层
        this.$emit("close");
        //提示成功
        this.$toast.success("修改成功");
      } catch (error) {
        this.$toast("修改失败,请稍后重试");
      }
    },
  },
};
</script>

<style>
</style>