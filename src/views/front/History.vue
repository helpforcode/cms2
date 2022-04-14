<template>
  <div class="words">
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
              <span class="word-date">{{item.day}}</span>
            </van-col>
          </van-row>

          <van-row>
            <van-col span="24">
              <WordRow :item="item"/>
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
      loading: false
    }
  },
  methods: {
    history() {
      this.loading = true
      word.dailyWordsAll().then(response => {
        this.items = response.data.data
        this.loading = false
      })
    }
  },
  mounted() {
    this.history()
  }
}
</script>
