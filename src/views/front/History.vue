<template>
  <div class="history">
    <van-row class="condition">
      <span class="filter-btn">一</span>
      <span class="filter-btn">二</span>
      <span class="filter-btn">三</span>
      <span class="filter-btn">四</span>
      <span class="filter-btn">五</span>
      <span class="filter-btn">六</span>
      <span class="filter-btn">七</span>
    </van-row>
    <van-row class="condition">
      <span @click="filterBtnClick(word, i)"
            class="filter-btn"
            :class="{active: word.active}"
            v-for="(word, i) in wordsWithActive" v-bind:key="i">
        {{word.word}}
      </span>
      <span class="filter-btn" @click="resetWordFilter">重置</span>
    </van-row>
    <van-row
        class="item-row"
        v-for="item in items" :key="item.id"
        :to="{name: 'WordDetail', params:{id: item.id}}"
    >
      <!--  title  -->
      <van-col span="24"
               v-bind:class="{inactive: item.status === 0}"
               class="subject van-ellipsis">
          <van-row>
            <van-col span="24">
              <span class="word-date">{{item.code}}</span>
              <span class="word-date">({{item.day}})</span>
            </van-col>
          </van-row>

          <van-row>
            <van-col span="24">
              <WordRow :item="item" :words-filtered="wordsFiltered"/>
            </van-col>
          </van-row>
      </van-col>

      <div class="van-hairline--bottom"></div>
    </van-row>
  </div>
</template>
<script>

import word from "@/api/word";
import WordRow from "@/components/WordRow";

export default {
  name: "History",
  components: {
    WordRow
  },
  data() {
    return {
      items: [],
      words: [],
      wordsFiltered: [],
      wordsWithActive: [],
      loading: false,
    }
  },
  methods: {
    history() {
      this.loading = true
      word.dailyWordsAll().then(response => {
        this.items = response.data.data
        this.loading = false
      })
    },
    wordsDistinct() {
      word.wordsDistinct().then(response => {
        this.words = response.data.data
        this.words.forEach(word => {
          this.wordsWithActive.push({word: word, active: false})
        })
      })
    },
    resetWordFilter() {
      this.wordsFiltered = []
      this.wordsWithActive.forEach(w => w.active = false)
    },
    filterBtnClick(word, i) {
      console.log(word)
      console.log(i)
      // this.wordsFilterBtn[word] = !this.wordsFilterBtn[word]
      // console.log(this.wordsFilterBtn[word])
      // this.$set(this.wordsFilterBtn, word, !this.wordsFilterBtn[word])
      // console.log(this.wordsFilterBtn)
      word.active = !word.active
      if (word.active) {
        this.wordsFiltered.push(word.word)
      } else {
        this.wordsFiltered.splice(this.wordsFiltered.indexOf(word.word), 1)
        // this.$delete(this.wordsFiltered, word.word)
        // Vue.delete(this.wordsFiltered, word.word)

      }
      console.log(this.wordsFiltered)
    },
    // filterBtnClass: function(word) {
    //   console.log(word)
    //   return {
    //     active: this.wordsFilterBtn[word]
    //   }
    // },
  },
  computed: {
  },
  mounted() {
    this.wordsDistinct()
    this.history()
  }
}
</script>

<style scoped>
.history {
  font-size: 12px;
}
.condition {
  display: flex;
  justify-content: space-between;
}
.filter-btn {
  height: 1.6em;
  text-align: center;
  padding: 0 .5em;
  border: 1px solid #ccc;
}
.filter-btn.active {
  color: red;
}
</style>
