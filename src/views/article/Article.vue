<template>
  <div class="articles d-flex flex-column">
    <van-list
        v-model="loading"
        :finished="finished"
        @load="nextPage()"
        :finished-text="'No more data'"
    >
      <van-cell
          v-for="article in articles" :key="article.id" :value="article.title"
          :to="{name: 'ArticleDetail', params:{id: article.id}}"
      >
          <template #title>
<!--            <van-icon class-prefix="fa" name="ellipsis"></van-icon>-->
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
                    :to="{name: item.routeName, params: {id:article.id}}"
                >
                  <v-icon class="ops" >{{item.icon}}</v-icon>
                </v-btn>
              </v-speed-dial>
            </div>
          </template>
      </van-cell>
    </van-list>

    <div class="bottom-bar">
      <v-fab-transition>
        <v-btn
            class="add"
            color="grey darken-3"
            dark
            bottom
            left
            fab
            :to="{name: 'ArticleForm', params: {id: 0}}"
        >
          <v-icon>fa-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>

  </div>
</template>

<script>
import article from "@/api/article"
export default {
  name: 'Article',
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
