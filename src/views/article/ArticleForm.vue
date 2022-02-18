
<template>
  <div class="article-form">

    <v-form>
      <v-select v-model="form.categoryId" :items="cates" :item-text="'name'" :item-value="'id'" label="Category"></v-select>
      <v-text-field v-model="form.title" label="Title"></v-text-field>
      <quill-editor v-model="form.content"></quill-editor>
      <v-text-field v-model="form.publishedAt" label="PublishedAt" @focus="toggleDatepicker(true)"></v-text-field>
      <nut-datepicker
          :is-visible="dataPickerVisible"
          title="请选择日期时间"
          type="datetime"
          startDate="2020-01-01 00:00"
          endDate="2030-12-31 00:00"
          defaultValue="2022-01-01 00:00"
          @close="toggleDatepicker(false)"
          @choose="publishedAtSelected"
      >
      </nut-datepicker>
      <v-btn color="success" @click="articleSubmit">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import {categories} from '@/api/category'
import {add as ArticleAdd, update as ArticleUpdate, article} from '@/api/article'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, {
  placeholder: 'Input content ...',
  modules: {
    toolbar: [{'header': 1},{'header':2}, {'list': 'ordered'}, 'color', 'align', 'bold', 'italic', 'link', 'image']
  }
})

export default {
  name: 'ArticleForm',
  data() {
    return {
      articleId: 0,
      form: {
        categoryId: 0,
        title: '',
        content: '',
        publishedAt: '',
      },
      dataPickerVisible: false,
      cates: [],
    }
  },
  methods: {
    articleSubmit() {
      let params = {
        categoryId: this.categoryId,
        title: this.title,
        content: this.content,
        publishedAt: this.publishedAt,
      }
      let resolve = response => {
        console.log(response)
        if (response.status === 200) {
          this.$router.push({name: 'Article'})
        }
      }
      let reject = error => {
        console.log(error)
      }
      this.articleId === 0
          ? ArticleAdd(params).then(resolve).catch(reject)
          : ArticleUpdate(params).then(resolve).catch(reject)
    },
    publishedAtSelected(d) {
      this.form.publishedAt = d[5]
    },
    toggleDatepicker(show) {
      this.dataPickerVisible = show
    }
  },
  mounted() {
    this.articleId = Number(this.$route.params.id)
    if (this.articleId !== 0) {
      article(this.articleId).then(response => {
        let data = response.data.data
        this.form = {
          ...data
        }
      })
    }
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
