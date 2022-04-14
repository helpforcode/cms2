<template>
  <div>
    <van-sticky>
      <daily-word />
    </van-sticky>
    <router-link :to="{name: 'History'}">To History</router-link>
    <hello-world />
  </div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'
  import DailyWord from "@/components/DailyWord";

  export default {
    name: 'Home',

    components: {
      HelloWorld,
      DailyWord,
    },
  }
</script>
