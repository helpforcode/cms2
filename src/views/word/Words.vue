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
                 class="subject van-ellipsis">
          <router-link :to="{name: 'WordForm', params:{id: item.id}}">
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

import word from "@/api/word"
import BottomBtn from "@/components/BottomBtn"
import WordRow from "@/components/WordRow";

export default {
  name: "Words",
  components: {
    BottomBtn,
    WordRow
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

.item-row {
  margin-top: 12px;
}
.words {
  font-size: 12px;
  padding-left: 1em;
}
.word-primary {
  font-weight: bold;
}
.subject span {
  padding: 1em 1em 1em 0;
  font-size: 12px;
}
.word-block {
  display: inline-flex;
  flex-direction: column;
  width: 2em;
  height: 3.5em;
  border: .5px solid #262626;
  border-radius: 0;
  margin: 1px 2px;
}
.word-block span {
  padding: 2px;
  text-align: center;
  height: 50%;
  width: 100%;
  font-weight: bold;
}
.word-txt {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.word-id {
  color: white;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.normal .word-id {
  background-color: #498ff2;
}
.special .word-id {
  background-color: #f27649;
}
.special .word-txt {
  color: #f27649;
}
</style>
