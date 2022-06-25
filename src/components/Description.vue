<template>
  <div>
    <div class="descriptions">
      <div class="blk-group">
        <h2 class="blk-title">相关知识</h2>

        <div class="desc blk-group" v-for="propType in propTypes" :key="propType.typeId">
          <h3 class="blk-sub-title">{{propType.name}}</h3>
          <van-row class="desc-item" v-for="prop in propType.props" :key="prop.id">
            <van-col span="4" class="left">{{prop.name}}</van-col>
            <van-col span="20" class="right">
              <span class="word-code" v-for="word in prop.words" :key="word">{{word}}</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import prop from "@/api/prop";

export default {
  name: 'Description',
  data() {
    return {
      propTypes: [],
    }
  },
  mounted() {
    prop.allProp().then(response => {
      this.propTypes = response.data.data
    })
  }
}
</script>

<style scoped lang="scss">
.descriptions {
  padding: 2em 0;

  .desc{
    padding: .5em 0;
    .word-code {
      margin-right: 1em;
    }
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
  .blk-sub-title {
    padding: 3px;
    background-color: #eeeeee;
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
.desc-item {
  border-bottom: 1px solid #cccccc;
  text-align: left;
  .left {
  }
}
</style>
