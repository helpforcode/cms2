<template>
  <div>
    <div v-for="group in articleGroup" :key="group.categoryId">
      <h2>{{group.categoryName}}</h2>
      <van-row v-for="article in group.articles" :key="article.id">
        <van-col>
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

</style>
