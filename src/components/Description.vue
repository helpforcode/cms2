<template>
  <div>
    <div class="descriptions">
      <div class="desc" v-for="propType in propTypes" :key="propType.typeId">
        {{propType.name}}
        <van-row v-for="prop in propType.props" :key="prop.id">
          <van-col span="4">{{prop.name}}</van-col>
          <van-col span="20">
            <span class="word-code" v-for="word in prop.words" :key="word">{{word}}</span>
          </van-col>
        </van-row>
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
</style>
