<template>
  <div>
    <van-sticky>
      <daily-word />
    </van-sticky>
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
