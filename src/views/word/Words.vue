<template>
  <div class="words d-flex flex-column">
    <van-list
        v-model="loading"
        :finished="finished"
        @load="nextPage()"
        :finished-text="'No more data'"
    >
      <!--  row  -->
      <van-row
          class="item-row"
          v-for="item in items" :key="item.id"
          :to="{name: 'WordDetail', params:{id: item.id}}"
      >
        <!--  title  -->
        <van-col span="24"
                 v-bind:class="{inactive: item.status === 0}"
                 class="title van-ellipsis">
          <router-link :to="{name: 'WordForm', params:{id: item.id}}">
            <span class="word-date">{{item.day}}</span>
            <span class="word-normal" v-for="w in item.words" v-bind:key="w.id">{{w.word}}-{{w.id}}</span>
            <span class="word-primary">{{item.primaryWord.word}}-{{item.primaryWord.id}}</span>
          </router-link>
        </van-col>

        <div class="van-hairline--bottom"></div>
      </van-row>
    </van-list>

    <BottomBtn :button-click="toAdd">
      <div>Add</div>
    </BottomBtn>

  </div>
</template>

<script>
import word from "@/api/word";
import BottomBtn from "@/components/BottomBtn";
export default {
  name: "Words",
  components: {
    BottomBtn
  },
  data() {
    return {
      finished: false,
      loading: false,
      pageParams: {page: 0, size: 10, sort: 'day,desc'},
      items: [],
      ops: [{op: 'edit', icon: 'fa-pen', routeName:'WordForm'}, {op: 'delete', icon: 'fa-trash-can'}],
      timer: null,
    }
  },
  methods: {
    nextPage(curPage) {
      this.timer = setTimeout(() => {
        curPage = curPage || this.pageParams.page
        this.pageParams.page = curPage + 1;
        this.pageParams.size = Number(this.$route.query.size || this.pageParams.size)

        word.dailyWords(this.pageParams).then(response => {
          let data = response.data.data
          let pageInfo = data.pageInfo
          this.items = this.items.concat(data.content)
          this.loading = false
          this.finished = curPage >= pageInfo.totalPages
        })
      }, 100)
    },
    operation(item, id, index) {
      if (item.op === 'edit') {
        this.$router.push({name: item.routeName, params:{id: id}})
      } else if (item.op === 'delete') {
        word.dailyRemove(id).then(response => {
          console.log(response)
          if (response.data.code === 200) {
            this.items[index].display = false
          }
        })
      }
    },
    toAdd() {
      this.$router.push({name: 'WordForm', params: {id: 0}})
    }
  },
  mounted() {
  },
  destroyed() {
    clearTimeout(this.timer)
  },
}
</script>

<style scoped>

.words {
  font-size: 12px;
}
.word-primary {
  font-weight: bold;
}
.title span {
  padding: 1em;
  font-size: 12px;
}
</style>
