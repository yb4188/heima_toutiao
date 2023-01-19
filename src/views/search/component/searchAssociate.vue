<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-16 20:11:14
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-17 16:04:36
 * @FilePath: \vue_project-m\toutiao-m\src\views\search\component\searchAssociate.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="associateContainer">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestionAssociation"
      :key="index"
    >
      <span
        slot="title"
        v-html="lightText(text)"
        @click="$emit('search', text)"
      ></span>
    </van-cell>
  </div>
</template>

<script>
import { getAssociateSuggestions } from "../../../api/user";
import { debounce } from "lodash";
export default {
  name: "searchAssociate",
  data() {
    return {
      suggestionAssociation: [],
    };
  },
  props: ["searchText"],
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        this.getAssociateSuggestionsData(value);
      }),
    },
  },
  methods: {
    async getAssociateSuggestionsData(q) {
      const { data } = await getAssociateSuggestions(q);
      this.suggestionAssociation = data.data.options;
    },

    //高亮
    lightText(text) {
      const lightStr = `<span class="active">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, lightStr);
    },
  },
};
</script>

<style scoped lang='less'>
.associateContainer {
  /deep/ .active {
    color: aqua;
  }
}
</style>