<template>
  <div>

    <span>{{words.code}}</span>
    <WordRow :item="words"/>
  </div>
</template>

<script>
import {dailyLatest} from "@/api/word";
import WordRow from "@/components/WordRow";

export default {
  name: "DailyWord",
  components: {
    WordRow
  },
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
