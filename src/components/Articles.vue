<template>
  <div>
    <div class="blk-group" v-for="group in articleGroup" :key="group.categoryId">
      <h2 class="blk-title">{{group.categoryName}}</h2>
      <van-row v-for="article in group.articles" :key="article.id">
        <van-col class="blk-row">
          <router-link :to="{name: 'FrontArticleDetail', params: {id: article.id}}">
            {{article.title}}
          </router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {articleGroup} from "@/api/article";

export default {
  name: "Articles",
  data() {
    return {
      articleGroup: []
    }
  },
  methods: {

  },
  mounted() {
    articleGroup().then(response => {
      this.articleGroup = response.data.data
    })
  }
}
</script>

<style scoped lang="scss">

.blk-group {
  text-align: center;
  margin: 3px 0;

  .blk-title {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #b4a078;
    padding: 3px;
  }
  .blk-row {
    padding: 3px;
    border: 1px solid #eeeeee;
    width: 100%;
    margin: 2px 0;
  }
}
</style>
