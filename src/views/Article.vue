<template>
  <div class="articles d-flex flex-column">
    <v-icon>fa-solid fa-ellipsis-vertical</v-icon>
    <v-icon>fa-ellipsis-vertical</v-icon>
    <v-icon>$add</v-icon>
    <v-icon>$ops</v-icon>
    <v-icon>$vuetify.icons.ops</v-icon>
    <font-awesome-icon icon="fa-ellipsis-vertical"></font-awesome-icon>
    icon
    <div class="article d-flex flex-row align-center"
        v-for="article in articles" :key="article.id"
    >
      <div>{{article.title}}</div>
      <v-spacer/>

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

      <v-speed-dial
          bottom
          right
          direction="left"
      >
        <template v-slot:activator>
          <v-icon>mdi-account-circle</v-icon>
        </template>
        <v-btn color="red">RD</v-btn>
        <v-btn color="blue">BL</v-btn>
      </v-speed-dial>
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
      ops: [{op: 'edit', icon: 'fa-solid fa-square-pen'}, {op: 'delete', icon: 'fa-solid fa-trash-can'}]
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
  text-align: right;
  width: 2em;
}
</style>
