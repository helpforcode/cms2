
<template>
  <div class="article-form">

    <v-form>
      <v-select v-model="categoryId" :items="cates" :item-text="'name'" :item-value="'id'" label="Category"></v-select>
      <v-text-field v-model="title" label="Title"></v-text-field>
      <v-text-field v-model="content" label="Content"></v-text-field>
      <quill-editor v-model="content"></quill-editor>
      <v-text-field v-model="publishedAt" label="PublishedAt" @focus="toggleDatepicker(true)"></v-text-field>
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
      <v-btn color="success" @click="articleAdd">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import {categories} from '@/api/category'
import {add as ArticleAdd} from '@/api/article'

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
      dataPickerVisible: false,
      cates: [],
      categoryId: 0,
      title: '',
      content: '',
      publishedAt: '',
    }
  },
  methods: {
    articleAdd() {
      ArticleAdd({
        categoryId: this.categoryId,
        title: this.title,
        content: this.content,
        publishedAt: this.publishedAt,
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    publishedAtSelected(d) {
      this.publishedAt = d[5]
    },
    toggleDatepicker(show) {
      this.dataPickerVisible = show
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
