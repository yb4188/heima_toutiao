<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-15 16:19:16
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-20 13:34:20
 * @FilePath: \vue_project-m\toutiao-m\src\views\search\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="aqua"
        @focus="isShow = false"
        class="search-from"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isShow" :searchText="searchText"></search-result>
    <!-- 搜索联想 -->
    <search-associate
      :searchText="searchText"
      v-else-if="searchText"
      @search="onSearch"
    ></search-associate>
    <!-- 搜索历史 -->
    <search-history
      v-else
      :searchHistorys="searchHistorys"
      @clearSearchHistorys="searchHistorys = []"
      @search='onSearch'
    ></search-history>
  </div>
</template>

<script>
import searchHistory from "./component/searchHistroy.vue";
import searchAssociate from "./component/searchAssociate.vue";
import searchResult from "./component/searchResult.vue";
import {setData, getData} from '../../utils/storeage'


export default {
  name: "searchIndex",
  data() {
    return {
      searchText: "",
      isShow: false,
      searchHistorys: getData('TOUTIAO_HISTORYLIST') || [],
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onSearch(val) {
      //搜索栏全名
      this.searchText = val;
      //追加历史记录
      const index = this.searchHistorys.indexOf(val);
      if (index !== -1) {
        this.searchHistorys.splice(index, 1);
      }
      this.searchHistorys.unshift(val);
      //展示隐藏搜索栏
      this.isShow = true;
    },
    onCancel() {},
  },
  components: {
    searchHistory,
    searchAssociate,
    searchResult,
  },
  watch: {
    searchHistorys(val){
      setData('TOUTIAO_HISTORYLIST', val)
    }
  }
};
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;

  .van-search__action {
    color: white;
  }
  .search-from {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>