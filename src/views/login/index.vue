<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-09 20:01:47
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-20 13:34:15
 * @FilePath: \vue_project-m\toutiao-m\src\views\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="loginContainer">
    <van-nav-bar class="page-nav-bar" title="登录"
      ><van-icon slot="left" name="cross" @click="$router.back()"
    /></van-nav-bar>

    <van-form @submit="onSubmit" ref="userForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFromRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>

      <van-field
        name="code"
        placeholder="输入验证码"
        v-model="user.code"
        :rules="userFromRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            millisecond
            :time="1000 * 5"
            format="ss"
            v-if="isCountDown"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="sendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-warp">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
//引入登录接口
import { login, sendSms } from "../../api/user";
import { Toast } from "vant";
export default {
  name: "myLogin",
  data() {
    return {
      user: {
        code: "",
        mobile: "",
      },
      userFromRules: {
        mobile: [
          { required: true, message: "请填写手机号码" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "手机号码格式错误" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDown: false,
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });

      try {
        let result = await login(user);
        Toast.success("登录成功");
        this.$store.commit("setUser", result.data.data);
        this.$router.back();
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          Toast.fail(error.response.data.message);
        }
      }
    },

    //发送验证码
    async sendSms() {
      //进行手机验证码验证
      try {
        await this.$refs.userForm.validate("mobile");
      } catch (error) {
        alert("验证失败", error);
      }
      this.isCountDown = true;

      //获取手机验证码
      try {
        let res = await sendSms(this.user.mobile1);
        console.log(res);
        this.isCountDown = false;
        this.$toast("登录成功");
      } catch (error) {
        console.log(error);
        if (error.response.status == 429) {
          alert(error.response.data.message);
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.loginContainer {
  .icon-shouji {
    font-size: 37px;
  }
  .icon-yanzhengma {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 170px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    color: #666;
    font-size: 22px;
  }
  .login-btn-warp {
    padding: 53px 33px;
    .login-btn {
      background-color: aqua;
      border: none;
    }
  }
}
</style>