
<template>
  <div class="cms-prop">
    <van-row>
      <van-col span="18">
        <div class="main">
          <div class="prop-type" v-for="(propType, typeIndex) in propTypes" :key="propType.typeId">
            <h2>{{propType.name}} <span @click="to('PropForm', {typeId: propType.typeId, id: 0})">+</span></h2>
            <div class="prop-group">
              <div class="prop-item" v-for="(prop, propIndex) in propType.props" :key="prop.propId">
                <h3>{{prop.name}}
                  <FontAwesomeIcon :icon="['fas', 'edit']"
                                   @click="to('PropForm', {typeId: propType.typeId, id:prop.propId})">
                  </FontAwesomeIcon>
                </h3>
                <div class="prop-container" @click="selectPropContainer(typeIndex, propIndex)"
                     :class="propIndex === pIndex && typeIndex === tIndex ? 'selected' : ''"
                >
                  <span class="prop-word" v-for="word in prop.words" :key="word.id">{{word}}</span>
                </div>
              </div>
            </div>
            <div class="save-btn">
              <van-button @click="saveType(typeIndex)">Save</van-button>
            </div>
          </div>
          <van-row>
            <van-col>
             <van-button @click="to('PropTypeForm', {id: 0})">ADD TYPE</van-button>
            </van-col>
          </van-row>
        </div>
      </van-col>

      <van-col span="6">
        <div class="side">
          <span class="word" v-for="word in words" :key="word.id"
                :class="{'in-prop': isWordInActiveProp(word.id), 'in-type': isWordInActiveType(word.id)}"
                @click="wordSelect(word.id)"
          >{{word.id}}</span>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>

import word from "@/api/word";
import {saveAllProp, allProp} from "@/api/prop";

import '@fortawesome/fontawesome-free/css/all.css'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default {
  name: 'Prop',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      tIndex: -1,
      pIndex: -1,
      inType: [],
      inProp: [],

      words: [],
      propTypes: [
        // {
        //   typeId: 1, name: 'Color', props: [
        //     {propId: 1, name: 'Red', code: 'R', words: [1,2], selected: false},
        //     {propId: 2, name: 'Green', code: 'G', words: [3,4], selected: false},
        //     {propId: 3, name: 'Blue', code: 'B', words:[5,6,7], selected: false},
        //   ]
        // },
        // {
        //   typeId: 2, name: 'Animal', props: [
        //     {propId: 4, name: 'Beat', code: 'R', words: [6,2], selected: false},
        //     {propId: 5, name: 'Bird', code: 'G', words: [5,4], selected: false},
        //   ]
        // },
      ]
    }
  },
  computed: {
  },
  methods: {
    selectPropContainer(typeIndex, propIndex) {
      this.tIndex = typeIndex
      this.pIndex = propIndex
    },
    getWordsInType(typeIndex) {
      return this.propTypes[typeIndex].props.flatMap(p => p.words).map(w => w)
    },
    isWordInType(typeIndex, wordId) {
      return this.getWordsInType(typeIndex).includes(wordId)
    },
    isWordInActiveType(wordId) {
      if (this.tIndex === -1) return false
      return this.getWordsInType(this.tIndex).includes(wordId)
    },
    getWordsInProp(typeIndex, propIndex) {
      return this.propTypes[typeIndex].props[propIndex].words.map(w => w)
    },
    isWordInProp(typeIndex, propIndex, wordId) {
      return this.getWordsInProp(typeIndex, propIndex).includes(wordId)
    },
    isWordInActiveProp(wordId) {
      if (this.tIndex === -1) return false
      return this.getWordsInProp(this.tIndex, this.pIndex).includes(wordId)
    },
    pushInPropWords(typeIndex, propIndex, wordId) {
      this.propTypes[typeIndex].props[propIndex].words.push(wordId)
    },
    pushWordsInActiveProp(wordId) {
      this.propTypes[this.tIndex].props[this.pIndex].words.push(wordId)
    },
    popWordFromActiveProp(wordId) {
      let index = this.propTypes[this.tIndex].props[this.pIndex].words.indexOf(wordId);
      if (index !== -1) {
        // remove
        this.propTypes[this.tIndex].props[this.pIndex].words.splice(index, 1)
      }
    },
    wordSelect(wordId) {
      if (this.tIndex === -1) return
      if (!this.isWordInActiveProp(wordId)) {
        // if in type, find and remove, then add
        this.removeInSiblings(this.tIndex, wordId)
        this.pushWordsInActiveProp(wordId)
      } else {
        // toggle: remove word from active prop
        this.popWordFromActiveProp(wordId)
      }
    },
    removeInSiblings(typeIndex, wordId) {
      this.propTypes[typeIndex].props.forEach(prop => {
        let index = prop.words.indexOf(wordId)
        if (index !== -1) {
          prop.words.splice(index, 1)
        }
      })
    },
    saveType(typeIndex) {
      console.log(typeIndex)
      saveAllProp(this.propTypes[typeIndex]).then(response => {
        console.log(response)
        this.$router.go(0);
      })
    },
    to(name, params) {
      this.$router.push({name: name, params: params})
    },
  },
  mounted() {
    word.words().then(response => {
      this.words = response.data.data
    }).catch(err => {
      console.log(err)
    })

    allProp().then(response => {
      this.propTypes = response.data.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">
.cms-prop {
  padding: 3em;
}
.prop-container {
  border: 1px solid #ccc;
}
.save-btn {
  margin-bottom: 2em;
}
.prop-container {
  display: flex;
  flex-wrap: wrap;
  min-height: 2em;
  .prop-word {
    display: flex;
    margin: 1px;
    width: 2em;
    border: 1px solid #eeeeee;
    padding: 1.5px;
  }
}
.prop-container.selected {
  border: 1px solid #498ff2;
}
.side {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;

  .word {
    display: flex;
    margin: 1px;
    width: 2em;
    border: 1px solid #eeeeee;
    padding: 1.5px;
  }
  .word.in-prop {
    color: #498ff2!important;
  }
  .word.in-type {
    color: red;
  }
}
</style>
