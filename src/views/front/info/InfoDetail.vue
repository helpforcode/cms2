<template>
  <div>
    <daily-word/>

    <div class="the-article" v-html="info.content"/>

    <Description/>

  </div>
</template>

<script>
import dailyWord from "@/components/DailyWord";
import Description from "@/components/Description";
// import Vue from 'vue'
import {detail} from "@/api/info";
// import axios from "axios";
export default {
  name: 'InfoDetail',
  components: {
    dailyWord,
    Description,
  },
  data() {
    return {
      cateId: 0,
      title: '',
      // siblings: []
      info: {},
    }
  },
  mounted() {
    this.id = Number(this.$route.params.id)
    detail(this.id).then(response => {
      this.info = response.data.data
    })
  }
}
</script>

<style scoped>
</style>
