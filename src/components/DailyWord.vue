<template>
  <div>

    <span>{{words.code}}</span>
    <span v-for="w in words.words" :key="w.id" >{{w.word}}-{{w.id}}</span>
    <span>{{words.primaryWord.word}}-{{words.primaryWord.id}}</span>
  </div>
</template>

<script>
import {dailyLatest} from "@/api/word";

export default {
  name: "DailyWord",
  data() {
    return {
      words: {primaryWord: {id: 0, word: ''}}
    }
  },
  mounted() {
    dailyLatest().then(response => {
      this.words = response.data.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
