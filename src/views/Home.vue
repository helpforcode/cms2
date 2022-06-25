<template>
  <div class="home">
    <van-sticky>
      <div class="daily-word-panel">
        <daily-word />
      </div>
    </van-sticky>

    <div class="history blk">
      <span class="l">历史记录</span>
      <span class="r"><router-link :to="{name: 'History'}">To History</router-link></span>
    </div>

<!--    <Articles/>-->

    <div>
      <!--  foreach category    -->
      <div class="blk-group" v-for="group in infoTypes" :key="group.cateId">
        <h2 class="blk-title">{{group.cateName}}</h2>
        <div class="category">
          <div class="articles">
            <van-row v-for="info in group.infos" :key="info.id" class="article-row">
              <router-link v-if="group.clickable"
                           :to="{name: 'InfoDetail', params: {id: info.id}}">
                <div class="blk-row">
                  <span><b>{{info.title}}</b></span>
                </div>
              </router-link>
              <div class="blk-row" v-else>
                <span>{{info.code}} {{info.title}}</span>
                <span>{{info.name}}</span>
                <span>{{info.remark}}</span>
              </div>
            </van-row>
          </div>
        </div>
      </div>
    </div>

    <Description/>

    <footer>
      <div>
        说明：本论坛所提供的内容...特此声明
      </div>
      <div>
        免责声明：以上所有...
      </div>
      <div>
        Others ...
      </div>
    </footer>
  </div>
</template>

<script>
  import DailyWord from "@/components/DailyWord";
  import info from "@/api/info";
  import Description from "@/components/Description";
  import Articles from "@/components/Articles";

  export default {
    name: 'Home',

    components: {
      DailyWord,
      Description,
      Articles,
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
  //padding: 1em;
}
.daily-word-panel {
  background-color: white;
}
.article-row {
}
.blk {
  margin: 3px 0;
  padding: 3px;
  background-color: #eeeeee;
  text-align: center;
  span {
    margin-right: 2em;
  }
}

.blk-group {
  text-align: center;
  margin: 3px 0;

  .blk-title {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #b4a078;
    padding: 3px;
  }
  .blk-row {
    padding: 3px;
    border: 1px solid #eeeeee;
    width: 100%;
    margin: 2px 0;

    span {
      text-align: left;
      width: 33.33%;
      display: inline-block;
    }
  }
}
footer {
  font-size: .7em;
  text-align: center;
  background-color: #b4a078;
  div {
    padding: 3px 2em;
  }
}
</style>
