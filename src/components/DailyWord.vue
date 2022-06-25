<template>
  <div class="daily-word-container">
    <van-row class="banner">

    </van-row>
    <van-row>
      <van-col span="4" class="tt">
        <div>什么菜</div>
        <div>{{words.code}}次出</div>
      </van-col>
      <van-col span="20" class="daily-word-panel">
        <WordRow :item="words"/>
      </van-col>
    </van-row>
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

<style scoped lang="scss">
.daily-word-container {
  .tt {
    vertical-align: center;
    text-align: center;
  }
  .daily-word-panel {
  }
}
.banner {
  background-color: #b4a078;
  height: 60px;
  width: 100%;
}
</style>
