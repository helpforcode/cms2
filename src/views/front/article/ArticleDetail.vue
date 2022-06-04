<template>
  <div>
    <daily-word/>

    <div class="the-article" v-html="article.content"/>

    <Description/>

  </div>
</template>
<script>
import {frontArticle as article} from "@/api/article";
import Description from "@/components/Description";
import dailyWord from "@/components/DailyWord";
export default {
  name: 'ArticleDetail',
  components: {
    Description
    , dailyWord
  },
  data() {
    return {
      id: 0,
      article: {}
    }
  },
  mounted() {
    this.id = Number(this.$route.params.id)
    article(this.id).then(response => {
      this.article = response.data.data
    })
  }
}
</script>

<style lang="scss">
.the-article {
  padding: 1em;
  width: 100%;
}
.the-article img {
  max-width: 100%;
}
</style>
