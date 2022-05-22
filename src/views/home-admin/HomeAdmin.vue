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
      <div v-for="group in infoTypes" :key="group.cateId">
        <van-divider>
          <router-link :to="{name: 'InfoCateForm', params: {id: group.cateId}}">{{group.cateName}}</router-link>
        </van-divider>
        <div class="category">
          <div class="articles">
            <van-row v-for="info in group.infos" :key="info.id" class="article">
              <router-link :to="{name: 'InfoForm', params: {cateId: group.cateId , id: info.id}}">
                <span>{{info.code}}</span>
                <span>{{info.title}}</span>
                <span>{{info.remark}}</span>
                <span>{{info.state}}</span>
              </router-link>
            </van-row>
          </div>
        </div>
      </div>
    </div>

    <div class="descriptions">
      <div class="description" v-for="propType in propTypes" :key="propType.typeId">
        {{propType.name}}
        <van-row v-for="prop in propType.props" :key="prop.id">
          <van-col span="4">{{prop.name}}</van-col>
          <van-col span="20">
            <span class="word-code" v-for="word in prop.words" :key="word">{{word}}</span>
          </van-col>
        </van-row>
      </div>
    </div>

  </div>
</template>

<script>
import DailyWord from "@/components/DailyWord";
import {dailyNext} from "@/api/word";
import WordRow from "@/components/WordRow";
import info from "@/api/info";
import prop from "@/api/prop";

export default {
  name: "HomeAdmin",
  data() {
    return {
      wordsNext: {id: 0, primaryWord: {id: 0, word: ''}},
      infoTypes: [],
      propTypes: [],
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
    info.all().then(response => {
      this.infoTypes = response.data.data
    })
    prop.allProp().then(response => {
      this.propTypes = response.data.data
    })
  }
}
</script>

<style scoped lang="scss">

.category {
  width: 100%;
  border: 1px solid #eeeeee;
  margin-bottom: 1em;
}
.article {
  span {
    margin-right: 1em;
  }
}
.word-code {
  margin-right: .5em;
}
</style>
