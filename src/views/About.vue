<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import article from "@/api/article"
export default {
  name: 'About',
  data() {
    return {
      articles: []
    }
  },
  methods: {

  },
  mounted() {
    article.articles().then(response => {
      this.articles = response.data.data.content
    })
  }
}
</script>
