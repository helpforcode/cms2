<template>
  <div>
    <van-sticky>
      <div class="daily-word-panel">
        <daily-word />
      </div>
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
<style scoped>
.daily-word-panel {
  background-color: white;
  padding: 1em 0;
}
</style>
