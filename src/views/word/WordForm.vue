<template>
  <div>
    {{this.form.day}}
    <van-field
        v-model="selectedWord1"
        is-link
        label="word1"
        placeholder="choose word"
        @click="wordsPopup"
    >
    </van-field>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
          :columns="wordsText"
          @confirm="onWordSelected"
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
      selectedWord1: '',
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
    if (this.wordId !== 0) {
      word.dailyWord(this.wordId).then(response => {
        let data = response.data.data
        this.form = {
          ...data
        }
        this.selectedWord1 = data.words[0].word
      })
    }
    word.words().then(response => {
      this.words = response.data.data
      this.wordsText = this.words.map(w => w.word)
      console.log(this.wordsText)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    onWordSelected(value, index) {
      console.log(value, index)
    },
    wordsPopup() {
      this.showPicker = true
    }
  }
}
</script>

<style scoped>

</style>
