<template>
  <div class="articles d-flex flex-column">
    <van-list
        v-model="loading"
        :finished="finished"
        @load="nextPage()"
        :finished-text="'No more data'"
    >
      <van-row
          class="article-row"
          v-for="article in articles" :key="article.id"
          :to="{name: 'ArticleDetail', params:{id: article.id}}"
      >
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
                  v-for="(item, index) in ops" :key="index"
                  @click="operation(item, article.id, index)"
              >
                <v-icon class="ops" >{{item.icon}}</v-icon>
              </v-btn>
            </v-speed-dial>
          </div>
        </van-col>
        <van-col span="16"
                 v-bind:class="{inactive: !article.display}"
                 class="van-ellipsis">
          <router-link :to="{name: 'ArticleDetail', params:{id: article.id}}">{{article.title}}</router-link>
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
// todo: category

import article from "@/api/article"
import BottomBtn from "@/components/BottomBtn";
export default {
  name: 'Article',
  components: {
    BottomBtn
  },
  data() {
    return {
      finished: false,
      loading: false,
      pageParams: {page: 0, size: 10},
      articles: [],
      ops: [{op: 'edit', icon: 'fa-pen', routeName:'ArticleForm'}, {op: 'delete', icon: 'fa-trash-can'}],
      timer: null,
    }
  },
  methods: {
    toAdd() {
      this.$router.push({name: 'ArticleForm', params: {id: 0}})
    },
    nextPage(curPage) {
      this.timer = setTimeout(() => {
        curPage = curPage || this.pageParams.page
        this.pageParams.page = curPage + 1;
        this.pageParams.size = Number(this.$route.query.size || this.pageParams.size)
        article.articles(this.pageParams).then(response => {
          let data = response.data.data
          let pageInfo = data.pageInfo
          this.articles = this.articles.concat(data.content)
          this.loading = false
          this.finished = curPage >= pageInfo.totalPages
        })
      }, 100)
    },
    operation(item, articleId, index) {
      if (item.op === 'edit') {
        this.$router.push({name: item.routeName, params:{id: articleId}})
      } else if (item.op === 'delete') {
        article.remove(articleId).then(response => {
          console.log(response)
          if (response.data.code === 200) {
            this.articles[index].display = false
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

<style>
.article-row .inactive a{
  color: #a7a7a7;
}
.articles {
  padding: 3em;
}
.article {
  line-height: 3em;
  border-bottom: 1px solid #eeeeee;
}
.ico {
  text-align: left;
  width: 2em;
}
.ico > .v-speed-dial--bottom {
  bottom: 0;
}
.ops {
  /*margin: 0 .5em;*/
}
.add {
  margin-bottom: 3em;
}
.bottom-bar {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 100%;

  border: 1px solid #eee;
  box-sizing: border-box;

  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 888;

  font-size: 1.2em;
  color: white;
  /*background: linear-gradient(*/
  /*    315deg,#498ff2 0%,#4965f2 100%);*/
}
</style>
