<template>
  <div class="history">
    <van-row class="condition">
      <span v-for="(i, index) in indexFilterBtn" v-bind:key="i"
            class="filter-btn"
            @click="indexBtnClick(index)" :class="{active: indexFiltered.indexOf(index) !== -1}">{{i}}
      </span>
      <span class="filter-btn" @click="resetIndexFilter">重置</span>
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
              <WordRow :item="item" :words-filtered="wordsFiltered" :index-filtered="indexFiltered"/>
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
      indexFilterBtn: ['一', '二', '三', '四', '五', '六', '七'],
      indexFiltered: [],
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
    resetIndexFilter() {
      this.indexFiltered = []
    },
    indexBtnClick(index) {
      if (this.indexFiltered.indexOf(index) !== -1) {
        this.indexFiltered.splice(this.indexFiltered.indexOf(index), 1)
      } else {
        this.indexFiltered.push(index)
      }
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
.item-row {
  margin-top: 1em;
}
.condition {
  margin-top: 1em;
}
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
