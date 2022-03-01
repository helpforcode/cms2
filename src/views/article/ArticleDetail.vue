
<template>

  <div class="article">

    <van-cell :value="article.title"></van-cell>
    <div class="article-content" v-html="article.content"></div>
    <van-cell :value="article.publishedAt"></van-cell>
    <div v-for="url in article.images" v-bind:key="url">
      <van-image width="5em" height="5em" :src="url"></van-image>
    </div>
  </div>
</template>

<script>
import {article} from '@/api/article'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      articleId: 0,
      article: {
        id: 0,
        categoryId: 0,
        title: '',
        content: '',
        images: '',
        link: '',
        publishedAt: '',
      }
    }
  },
  mounted() {
    this.articleId = Number(this.$route.params.id)
    article(this.articleId).then(response => {
      this.article = response.data.data
    })
  }
}
</script>

<style >
.article {
  padding: 1em;
}
.article-content img {
  max-width: 100%;
}
</style>
