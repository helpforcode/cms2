<template>
  <div class="word-row">
    <div class="word-block normal" :data-word="w.word"
         v-for="(w, index) in localItem.words" v-bind:key="w.id"
         :class="{inactive: localWordsFiltered.length > 0 && localWordsFiltered.indexOf(w.word) === -1
         || localIndexFiltered.length > 0 && localIndexFiltered.indexOf(index) === -1}"
         @click="normalClicked(w, index)">
      <span class="word-txt">{{w.word}}</span>
      <span class="word-id">{{w.id}}</span>
    </div>
    <div class="word-block special" :data-word="localItem.primaryWord.word"
         :class="{inactive: localWordsFiltered.length > 0 && localWordsFiltered.indexOf(localItem.primaryWord.word) === -1
         || localIndexFiltered.length > 0 && localIndexFiltered.indexOf(6) === -1}"
         @click="primaryClicked(localItem.primaryWord)">
      <span class="word-txt">{{localItem.primaryWord.word}}</span>
      <span class="word-id">{{localItem.primaryWord.id}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "WordRow",
  props: {
    item: {},
    indexFiltered: [],
    wordsFiltered: [],
  },
  model: {
    // prop: 'what',
  },
  data() {
    return {
      localIndexFiltered: [],
      localWordsFiltered: []
      // localItem: {}
    }
  },
  computed: {
    localItem: {
      get() {
        return this.item
      },
      set(v) {
      }
    }
  },
  watch: {
    item(newV/*, oldV*/) {
      // console.log("Watching item", oldV)
      this.localItem = newV;
    },
    localItem(newV/*, oldV*/) {
      // console.log("Watching local item", oldV)
      this.$emit('update:item', newV);
    },
    indexFiltered(newV) {
      this.localIndexFiltered = newV
    },
    wordsFiltered(newV) {
      this.localWordsFiltered = newV
    }
  },
  mounted() {
    this.localItem = this.item;
    this.localIndexFiltered = this.indexFiltered || [];
    this.localWordsFiltered = this.wordsFiltered || [];
  },
  methods: {
    primaryClicked(word) {
      this.$emit('primaryClicked', word)
    },
    normalClicked(word, index) {
      this.$emit('normalClicked', {word, index})
    }
  }
}
</script>

<style scoped>

.word-row {
  display: inline;
}
.word-block {
  display: inline-flex;
  flex-direction: column;
  width: 3em;
  height: 3.5em;
  border: .5px solid #262626;
  border-radius: 0;
  margin: 1px 2px;
}
.word-block span {
  padding: 2px;
  text-align: center;
  height: 50%;
  width: 100%;
  font-weight: bold;
}
.word-block.inactive {
  opacity: 40%;
}
.word-txt {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.word-id {
  color: white;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.normal .word-id {
  background-color: #498ff2;
}
.special .word-id {
  background-color: #f27649;
}
.special .word-txt {
  color: #f27649;
}
</style>
