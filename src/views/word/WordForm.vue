<template>
  <div>
    <div @click="wordsPopup">
      <span v-for="item in form.words" v-bind:key="item.id">
        {{item.word}}
      </span>
    </div>
    <div @click="showPrimaryPicker = true">
      <span class="primary-word">{{form.primaryWord.word}}</span>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="normalWords"
          @confirm="onWordSelected"
      />
    </van-popup>
    <van-popup v-model="showPrimaryPicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="primaryWords"
          @confirm="onPrimaryWordSelected"
      />
    </van-popup>

  </div>
</template>

<script>
import word from "@/api/word";

export default {
  name: "WordForm",
  data() {
    return {
      showPicker: false,
      showPrimaryPicker: false,
      normalWords: [],
      primaryWords: {},
      words: [],
      wordsText: [],
      wordId: Number,
      form: {
        id: Number,
        primaryWord: {
          id: Number,
          word: String
        },
        words: [],
        publishedAt: String,
        day: String,
        status: Number,
      }
    }
  },
  mounted() {
    this.wordId = Number(this.$route.params.id)

    word.words().then(response => {
      this.words = response.data.data
      this.wordsText = this.words.map(w => w.word)

      if (this.wordId !== 0) {
        word.dailyWord(this.wordId).then(response => {
          let wordDaily = response.data.data
          this.form = {
            ...wordDaily
          }
          wordDaily.words.forEach((wd, i) => {
            this.normalWords[i] = {
              values: this.wordsText,
              defaultIndex: this.getIndexOfWord(wd)
            }
          })
          this.primaryWords = [{
            values: this.wordsText,
            defaultIndex: this.getIndexOfWord(wordDaily.primaryWord)
          }]
        })
      }
    }).catch(err => {
      console.log(err)
    })

  },
  methods: {
    getIndexOfWord(inputWord) {
      let index = 0
      this.words.forEach((word, i) => {
        if (word.id === inputWord.id) {
          index = i
        }
      })
      return index
    },
    onWordSelected(curValues, curIndexes) {
      // console.log(curValues)
      // console.log(curIndexes)
      curIndexes.forEach((index,i) => {
        // console.log("sel:",this.words[index], i)
        this.form.words[i] = this.words[index]
      })
      this.showPicker = false
    },
    onPrimaryWordSelected(curValues, curIndexes) {
      console.log(curValues, curIndexes)
      curIndexes.forEach((index) => {
        this.form.primaryWord = this.words[index]
      })
      this.showPrimaryPicker = false
    },
    wordsPopup() {
      this.showPicker = true
    }
  }
}
</script>

<style scoped>

.primary-word {
  font-weight: bold;
}
</style>
