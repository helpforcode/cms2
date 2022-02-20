
<template>

  <div>

  </div>
</template>

<script>
import {article} from '@/api/article'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      articleId: 0,
    }
  },
  mounted() {
    this.articleId = Number(this.$route.params.id)
    article(this.articleId).then(response => {
      console.log(response)
    })
  }
}
</script>
