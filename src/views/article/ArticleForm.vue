
<template>
  <div class="article-form">

    <v-form>
      <options v-model="form.categoryId"
               :items="cates"
               item-key="id"
               item-value="name"
               label="Category"
               placeholder="select category"
               @selected="onCateSelected"
      />

      <van-field name="switch" label="display">
        <template #input>
          <van-switch v-model="form.display"></van-switch>
        </template>
      </van-field>
      <van-field v-model="form.title" label="Title" placeholder="Input title"></van-field>
      <quill-editor v-model="form.content"></quill-editor>

      <van-field
          v-model="form.publishedAt"
          label="PublishedAt"
          readonly
          @click="showDatePicker = true"
      />
      <van-popup v-model="showDatePicker" position="bottom">
        <van-datetime-picker
            v-model="publishedAtComputed"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="dateSelected"
        />
      </van-popup>

      <Photo v-model="selectedImages" @change="imageSelectedChange"></Photo>

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
    </v-form>

    <bottom-btn :button-click="articleSubmit">Submit</bottom-btn>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import {categories} from '@/api/category'
import {add as ArticleAdd, update as ArticleUpdate, article} from '@/api/article'
import Photo from '@/views/Photo'
import {getUrl} from "@/api/image";
import BottomBtn from "@/components/BottomBtn";
import Options from "@/components/Options";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import moment from "@/util/moment";

Vue.use(VueQuillEditor, {
  placeholder: 'Input content ...',
  modules: {
    toolbar: [{'header': 1},{'header':2}, {'list': 'ordered'}, 'color', 'align', 'bold', 'italic', 'link', 'image']
  }
})

export default {
  name: 'ArticleForm',
  components: {
    Photo,
    BottomBtn,
    Options,
  },
  data() {
    return {
      articleId: 0,
      form: {
        display: false,
        categoryId: 0,
        title: '',
        content: '',
        publishedAt: '',
      },
      dataPickerVisible: false,
      cates: [],
      selectedImages: [],
      showDatePicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2028, 10, 10),
      theDate: new Date(),
    }
  },
  computed: {
    publishedAtComputed: {
      get() {
        return moment(this.form.publishedAt).toDate()
      },
      set(date) {
        console.log(date)
      }
    }
  },
  methods: {
    articleSubmit() {
      let params = {
        id: this.articleId,
        categoryId: this.form.categoryId,
        display: this.form.display,
        title: this.form.title,
        content: this.form.content,
        publishedAt: this.form.publishedAt,
        images: this.selectedImages.map(img => img.relativeUrl)
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
    },
    dateSelected(value) {
      const dateFormat = 'YYYY-MM-DD'
      this.form.publishedAt = moment(value).format(dateFormat)
      this.showDatePicker = false
    },
    imageSelectedChange(images) {
      console.log('selected:', images)
      console.log(this.selectedImages)
      console.log(this.selectedImages.map(img => img.url))
    },
    onCateSelected(cateId) {
      console.log(cateId)
      console.log(this.form.categoryId)
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
        data.images.map(url => {
          this.selectedImages.push({relativeUrl: url, url: getUrl(url)})
        })
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
