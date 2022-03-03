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

        <!--  buttons  -->
        <van-col span="8">
          <div class="ico d-flex">
            <v-speed-dial
                bottom
                left
                direction="right"
            >
              <template v-slot:activator>
                <v-icon>fa-ellipsis</v-icon>
              </template>
              <v-btn
                  fab
                  dark
                  small
                  v-for="(op, index) in ops" :key="index"
                  @click="operation(op, item.id, index)"
              >
                <v-icon class="ops" >{{op.icon}}</v-icon>
              </v-btn>
            </v-speed-dial>
          </div>
        </van-col>

        <!--  title  -->
        <van-col span="16"
                 v-bind:class="{inactive: item.status === 0}"
                 class="van-ellipsis">
          <router-link :to="{name: 'WordDetail', params:{id: item.id}}">
            <span class="word-date">{{item.day}}</span>
            <span class="word-normal" v-for="w in item.words" v-bind:key="w.id">{{w.word}}-{{w.id}}</span>
            <span class="word-primary">{{item.primaryWord.word}}-{{item.primaryWord.id}}</span>
          </router-link>
        </van-col>

        <div class="van-hairline--bottom"></div>
      </van-row>
    </van-list>

  </div>
</template>

<script>
import word from "@/api/word";
export default {
  name: "Words",
  data() {
    return {
      finished: false,
      loading: false,
      pageParams: {page: 0, size: 10, sort: 'id,desc'},
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
    }
  },
  mounted() {
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>

.words {
  font-size: 12px;
}
</style>
