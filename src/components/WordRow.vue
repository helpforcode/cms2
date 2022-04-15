<template>
  <div class="word-row">
    <div class="word-block normal" :data-word="w.word"
         v-for="(w, index) in localItem.words" v-bind:key="w.id"
         :class="{inactive: wordsFiltered.length > 0 && wordsFiltered.indexOf(w.word) === -1
         || indexFiltered.length > 0 && indexFiltered.indexOf(index) === -1}"
         @click="normalClicked(w, index)">
      <span class="word-txt">{{w.word}}</span>
      <span class="word-id">{{w.id}}</span>
    </div>
    <div class="word-block special" :data-word="localItem.primaryWord.word"
         :class="{inactive: wordsFiltered.length > 0 && wordsFiltered.indexOf(localItem.primaryWord.word) === -1
         || indexFiltered.length > 0 && indexFiltered.indexOf(6) === -1}"
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
    what: {
      type: String,
      default: 'x'
    }
  },
  model: {
    prop: 'what',
  },
  data() {
    return {
      // localItem: {}
    }
  },
  computed: {
    localItem: {
      get() {
        return this.item
      },
      set(v) {
        console.log(v)
      }
    }
  },
  watch: {
    item(newV, oldV) {
      console.log("Watching item", oldV)
      this.localItem = newV;
    },
    localItem(newV, oldV) {
      console.log("Watching local item", oldV)
      this.$emit('update:item', newV);
    }
  },
  mounted() {
    this.localItem = this.item;
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
  width: 2em;
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
