<template>
  <div>
    <div class="d-flex flex-column">
      <div class="d-flex">

        <WordRow :item="form" @normalClicked="normalClicked" @primaryClicked="primaryClicked"/>

        <van-popup position="bottom" v-for="(item, i) in form.words" v-bind:key="i"
                   v-model="showPickers['picker' + i]"
        >
          <van-picker
              :ref="'picker' + i"
              :columns="normalWords[i]"
              @confirm="wordConfirm(i)"
              show-toolbar/>
        </van-popup>

        <van-popup v-model="showPrimaryPicker" position="bottom">
          <van-picker
              show-toolbar
              :columns="primaryWords"
              @confirm="onPrimaryWordSelected"
          />
        </van-popup>
      </div>

      <div class="d-flex">
        <van-field
            v-model="formatDate"
            label="Day"
            readonly
            @click="showDatePicker = true"
        />
      </div>

      <div class="">
        <van-popup v-model="showDatePicker" position="bottom">
          <van-datetime-picker
              v-model="theDate"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="dateSelected"
          />
        </van-popup>
      </div>
    </div>


    <van-field name="switch" label="Status">
      <template #input>
        <van-switch v-model="form.status"></van-switch>
      </template>
    </van-field>

    <BottomBtn :button-click="save">
      <div>Submit</div>
    </BottomBtn>

  </div>

</template>

<script>
import word from "@/api/word";
import moment from "@/util/moment";
import BottomBtn from "@/components/BottomBtn";
import WordRow from "@/components/WordRow";
import toast from '@nutui/nutui/dist/packages/toast'

const dateFormat = 'YYYY-MM-DD'
const wordCapacity = 6

export default {
  name: "WordForm",
  components: {
    BottomBtn,
    WordRow,
  },
  data() {
    return {
      edit: false,
      showPrimaryPicker: false,
      showDatePicker: false,
      showPickers: {
        picker0: false,
        picker1: false,
        picker2: false,
        picker3: false,
        picker4: false,
        picker5: false,
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2028, 10, 10),

      normalWords: [],
      primaryWords: {},
      words: [],
      wordsText: [],
      wordId: Number,
      theDate: new Date(),
      form: {
        id: Number,
        primaryWord: {
          id: Number,
          word: String
        },
        words: [],
        day: String,
        status: Number,
      }
    }
  },
  computed: {
    formatDate: function(){
      return moment(this.theDate).format(dateFormat)
    }
  },
  mounted() {
    this.wordId = Number(this.$route.params.id)
    this.edit = Number.isInteger(this.wordId) && this.wordId > 0

    word.words().then(response => {
      this.words = response.data.data
      this.wordsText = this.words.map(w => w.word + '' + w.id)

      if (this.edit) {
        word.dailyWord(this.wordId).then(response => {
          let wordDaily = response.data.data
          this.form = {
            ...wordDaily
          }
          this.theDate = moment(wordDaily.day, moment.HTML5_FMT.DATE).toDate()

          for(let i = 0; i < wordCapacity; i++) {
            let wd = i < wordDaily.words.length ? wordDaily.words[i] : {id:0};
            let pickerName = 'picker'+i
            this.showPickers[pickerName] = false
            this.normalWords[i] = [{
              values: this.wordsText,
              defaultIndex: this.getIndexOfWord(wd)
            }]
          }
          // if words not enough, supplement
          let wordsLen = this.form.words.length
          if (wordsLen < wordCapacity) {
            for (let i = 0; i < wordCapacity - wordsLen; i++) {
              this.form.words[wordsLen+i] = {word: '-'}
            }
          }
          this.primaryWords = [{
            values: this.wordsText,
            defaultIndex: this.getIndexOfWord(wordDaily.primaryWord)
          }]
        })
      } else {
        this.initWords()
      }
    }).catch(err => {
      console.log(err)
    })

  },
  methods: {
    initWords() {
      for (let i=0; i<wordCapacity; i++) {
        let pickerName = 'picker'+i
        this.showPickers[pickerName] = false
        this.normalWords[i] = [{
          values: this.wordsText,
          defaultIndex: 0,
        }]
        // init form for words
        this.form.words[i] = {
          word: '-'
        }
      }
      this.primaryWords = [{
        values: this.wordsText,
        defaultIndex: 0
      }]
      // init form for primary word
      this.form.primaryWord = {
        word: '-'
      }
      // init day
      this.form.day = moment(this.theDate).format(dateFormat)

    },
    getIndexOfWord(inputWord) {
      let index = 0
      this.words.forEach((word, i) => {
        if (word.id === inputWord.id) {
          index = i
        }
      })
      return index
    },
    wordConfirm(i) {
      // console.log(i)
      // console.log(this.$refs.picker)
      // console.log(this.$refs.picker[i].getValues())
      // console.log(this.$refs.picker[i].getIndexes())
      // console.log(this.words[this.$refs.picker[i].getIndexes()[0]])
      // this.form.words[i] = this.words[this.$refs.picker[i].getIndexes()[0]]
      // this.form.words.reverse().reverse()
      // this.$set(this.form.words, i, this.words[this.$refs.picker[i].getIndexes()[0]])
      // console.log(this.$refs)
      let word = this.words[this.$refs['picker'+i][0].getIndexes()[0]];
      let exist = false
      this.form.words.forEach(w => {
        if (w.id === word.id) {
          exist = true
        }
      })
      if (exist) {
        toast.fail("已存在")
        return
      }
      this.$set(this.form.words, i, this.words[this.$refs['picker'+i][0].getIndexes()[0]])
      this.showPickers['picker'+i] = false
    },
    onPrimaryWordSelected(curValues, curIndexes) {
      console.log(curValues, curIndexes)
      curIndexes.forEach((index) => {
        this.form.primaryWord = this.words[index]
      })
      this.showPrimaryPicker = false
    },
    wordsPopup(i) {
      this.showPickers['picker'+i] = true
    },
    dateSelected(value) {
      this.form.day = moment(value).format(dateFormat)
      this.showDatePicker = false
    },
    normalClicked(param) {
      this.wordsPopup(param.index)
    },
    primaryClicked() {
      this.showPrimaryPicker = true
    },
    save() {
      let resolved = response => {
        if (response.status === 200) {
          this.$router.push({name: 'Words'})
        }
      }
      let reject = err => console.log(err)

      this.edit
          ? word.dailyUpdate(this.form).then(resolved).catch(reject)
          : word.dailyAdd(this.form).then(resolved).catch(reject)
    }
  }
}
</script>

<style scoped>

.primary-word {
  font-weight: bold;
}
.word {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  border-radius: 25%;
  width: 3em;
  height: 3em;
  padding: .2em;
}
</style>
