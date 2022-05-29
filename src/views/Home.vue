<template>
  <div class="home">
    <van-sticky>
      <div class="daily-word-panel">
        <daily-word />
      </div>
    </van-sticky>
    <router-link :to="{name: 'History'}">To History</router-link>

    <div>
      <!--  foreach category    -->
      <div v-for="group in infoTypes" :key="group.cateId">
        <van-divider>
          {{group.cateName}}
        </van-divider>
        <div class="category">
          <div class="articles">
            <van-row v-for="info in group.infos" :key="info.id" class="article-row">
              <router-link v-if="group.clickable"
                           :to="{name: 'InfoDetail', params: {cateId: group.cateId, title: info.title}}">
                <div>
                  <span>{{info.code}}</span>
                  <span><b>{{info.title}}</b></span>
                  <span>{{info.remark}}</span>
                  <span v-if="group.clickable">{{info.state}}</span>
                </div>
              </router-link>
              <div v-else>
                <span>{{info.code}}</span>
                <span><b>{{info.title}}</b></span>
                <span>{{info.remark}}</span>
                <span v-if="group.clickable">{{info.state}}</span>
              </div>
            </van-row>
          </div>
        </div>
      </div>
    </div>

    <Description/>

  </div>
</template>

<script>
  import DailyWord from "@/components/DailyWord";
  import info from "@/api/info";
  import Description from "@/components/Description";

  export default {
    name: 'Home',

    components: {
      DailyWord,
      Description,
    },
    data() {
      return {
        infoTypes: [],
      }
    },
    mounted() {
      info.all().then(response => {
        this.infoTypes = response.data.data
      })
    }
  }
</script>
<style scoped lang="scss">
.home {
  padding: 1em;
}
.daily-word-panel {
  background-color: white;
}
.article-row {
  span {
    margin-right: 1em;
  }
}
</style>
