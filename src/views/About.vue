<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'About',
  methods: {

  },
  mounted() {
    Vue.axios.get('http://httpbin.org/get').then(response => {
      console.log(response)
    }).catch(err => {
      console.log('err', err)
    })
  }
}
</script>
