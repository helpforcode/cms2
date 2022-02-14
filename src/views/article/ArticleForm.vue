
<template>
  <div class="article-form">

    <v-form>
      <v-select v-model="categoryId" :items="cates" :item-text="'name'" :item-value="'id'" label="Category"></v-select>
      <v-text-field v-model="title" label="Title"></v-text-field>
      <v-text-field v-model="content" label="Content"></v-text-field>
      <v-text-field v-model="publishedAt" label="PublishedAt"></v-text-field>
      <v-btn color="success" @click="articleAdd">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import {categories} from '@/api/category'

export default {
  name: 'ArticleForm',
  data() {
    return {
      cates: [],
      categoryId: 0,
      title: '',
      content: '',
      publishedAt: '',
    }
  },
  methods: {
    articleAdd() {
      console.log(this.title)
    }
  },
  mounted() {
    categories().then(response => {
      this.cates = response.data.data.content
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.article-form {
  padding: 3em;
}
</style>
