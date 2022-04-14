<template>
  <div>
    <div>
      <daily-word/>
      <div v-if="wordsNext">
        <span>{{wordsNext.code}}</span>
        <span @click="toUpdate(wordsNext.id)">
          <WordRow :item="wordsNext" />
        </span>
      </div>
      <div v-else>
        <router-link :to="{name: 'Words'}">Go Set Next</router-link>
      </div>
    </div>

    <div>
      <!--  foreach category    -->
      <div v-for="group in articleGroup" :key="group.id">
        <van-divider>
          <router-link :to="{name: 'ArticleForm', params: {id: 0}}">{{group.categoryName}}</router-link>
        </van-divider>
        <div class="category">
          <div class="articles">
            <van-row v-for="article in group.articles" :key="article.id" class="article">
              <router-link :to="{name: 'ArticleForm', params: {id: article.id}}">{{article.title}}</router-link>
            </van-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DailyWord from "@/components/DailyWord";
import {dailyNext} from "@/api/word";
import {articleGroup} from "@/api/article";
import WordRow from "@/components/WordRow";

export default {
  name: "HomeAdmin",
  data() {
    return {
      wordsNext: {id: 0, primaryWord: {id: 0, word: ''}},
      articleGroup: [],
    }
  },
  components: {
    DailyWord,
    WordRow,
  },
  methods: {
    toUpdate(id) {
      this.$router.push({name: 'WordForm', params:{id: id}})
    }
  },
  mounted() {
    dailyNext().then(response => {
      this.wordsNext = response.data.data
    }).catch(err => {
      console.log(err)
    })
    articleGroup().then(response => {
      this.articleGroup = response.data.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

.category {
  width: 100%;
  border: 1px solid #eeeeee;
  margin-bottom: 1em;
}
</style>
