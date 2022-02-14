<template>
  <div class="articles d-flex flex-column">
    <div class="article d-flex flex-row align-center"
        v-for="article in articles" :key="article.id"
    >
<!--      <v-menu >-->
<!--        <template class="ico" v-slot:activator="{on, attrs}">-->
<!--          <fa-icon icon="fa-solid fa-ellipsis-vertical"-->
<!--                   v-bind="attrs"-->
<!--                   v-on="on"-->
<!--          />-->
<!--        </template>-->

<!--        <v-list>-->
<!--          <v-list-item v-for="(item, index) in ops" :key="index">-->
<!--            <v-list-item-title>-->
<!--              {{item.op}}-->
<!--            </v-list-item-title>-->
<!--          </v-list-item>-->
<!--        </v-list>-->
<!--      </v-menu>-->
      <div class="ico d-flex">
        <v-speed-dial
            bottom
            left
            direction="right"
        >
          <template v-slot:activator>
            <v-icon>fa-ellipsis-vertical</v-icon>
          </template>
          <v-btn
              fab
              dark
              small
              v-for="(item, index) in ops" :key="index"
          >
            <v-icon class="ops" >{{item.icon}}</v-icon>
          </v-btn>
        </v-speed-dial>
      </div>

      <v-spacer/>

      <div>{{article.title}}</div>
    </div>

    <div class="bottom-bar">
      <v-fab-transition>
        <v-btn
            class="add"
            color="grey darken-3"
            dark
            bottom
            left
            fab
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
      articles: [],
      ops: [{op: 'edit', icon: 'fa-pen'}, {op: 'delete', icon: 'fa-trash-can'}]
    }
  },
  methods: {

  },
  mounted() {
    article.articles().then(response => {
      this.articles = response.data.data.content
    })
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
