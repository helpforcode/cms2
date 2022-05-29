<template>
  <div>
    <van-row v-for="info in siblings" :key="info.id">
      <van-col>{{info.code}}</van-col>
      <van-col>{{info.title}}</van-col>
      <van-col>{{info.remark}}</van-col>
    </van-row>
  </div>
</template>

<script>
// import Vue from 'vue'
import {siblings} from "@/api/info";
// import axios from "axios";
export default {
  name: 'InfoDetail',
  data() {
    return {
      cateId: 0,
      title: '',
      siblings: []
    }
  },
  mounted() {
    this.cateId = Number(this.$route.params.cateId)
    this.title = this.$route.params.title
    console.log(this.cateId)
    console.log(this.title)
    siblings({cateId: this.cateId, title: this.title}).then(response => {
      this.siblings = response.data.data
    })
  }
}
</script>

<style scoped>
</style>
