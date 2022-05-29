<template>
  <div class="cms-info">
    <div class="cate" v-for="(cate) in cates" :key="cate.cateId">
      <div class="info-title" @click="to('InfoCateForm', {id: cate.cateId})"
           :class="cate.clickable ? 'clickable' : '' "
      >
        {{ cate.cateName }}
        <span class="title-edit">
          <FontAwesomeIcon :icon="['fas', 'edit']"></FontAwesomeIcon>
        </span>
      </div>
      <div class="info-container">
        <van-button class="row-add" type="default" @click="to('InfoForm', {id:0, cateId:cate.cateId})">
          <FontAwesomeIcon :icon="['fas', 'plus']"></FontAwesomeIcon>
        </van-button>
        <van-row v-for="(info) in cate.infos" :key="info.id"
                 class="info-row"
                 :class="[info.visible ? '' : 'invisible', info.code === code ? 'cur' : '']"
        >
          <van-col span="1">
                    <span class="inline-input visible">
                      <span class="circle-state" :class="info.visible ? 'visible' : 'invisible'">
                      </span>
                    </span>
          </van-col>
          <van-col span="2">
            <span class="inline-input code">{{ info.code }}</span>
          </van-col>
          <van-col span="8">
            <span class="inline-input tt">{{ info.title }}</span>
          </van-col>
          <van-col span="8">
            <span class="inline-input remark">{{ info.remark }}</span>
          </van-col>
          <van-col span="3">
                    <span class="inline-input state">
                      <span :class="info.state === 1 ? 'active' : info.state === -1 ? 'inactive' : 'default'">
                        <FontAwesomeIcon :icon="['fas', 'check']" v-if="info.state === 1"></FontAwesomeIcon>
                        <FontAwesomeIcon :icon="['fas', 'close']" v-else-if="info.state === -1"></FontAwesomeIcon>
                        <FontAwesomeIcon :icon="['fas', 'question']" v-else></FontAwesomeIcon>

                      </span>
                    </span>
          </van-col>
          <van-col span="2">
            <span @click="to('InfoForm', {id:info.id, cateId:cate.cateId})">
              <FontAwesomeIcon :icon="['fas', 'edit']"></FontAwesomeIcon>
            </span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="cate">
      <van-row>
        <van-col class="cate-add" span="24" @click="to('InfoCateForm', {id:0})">
          <FontAwesomeIcon :icon="['fas', 'plus']"></FontAwesomeIcon>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import info from "@/api/info"
import {latestCode} from "@/api/word";
import '@fortawesome/fontawesome-free/css/all.css'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'

library.add(fas)

// Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'Info',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      code: 0,
      tmpAdd: {
        id: Number,
        state: Number,
      },
      states: [
        {id: 1, name: 'Y'},
        {id: -1, name: 'N'},
        {id: 0, name: '-'},
      ],
      cates: []
    }
  },
  mounted() {
    info.all().then(response => {
      this.cates = response.data.data
    })
    latestCode().then(response => {
      this.code = Number.parseInt(response.data.data)
    })
  },
  methods: {
    to(name, params) {
      this.$router.push({name: name, params: params})
    },
  },
}
</script>

<style scoped lang="scss">
.cms-info {
  padding: 3em;
}

.info-title {
  font-weight: bold;
  margin-bottom: .5em;
}
.info-title.clickable {
  color: #498ff2;
}

.visible {
  vertical-align: center;
}

.circle-state {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: inline-block;
}

.circle-state.visible {
  background-color: #42ce2c;
}

.circle-state.invisible {
  background-color: #ccc;
}

.state {
  font-weight: bold;

  .active {
    color: green;
  }

  .inactive {
    color: red;
  }
}

.info-row.invisible {
  opacity: .5;
}

.info-row.cur {
  font-weight: bold;
}

.cate {
  border: 1px solid #ccc;
  padding: 1em;
  margin-bottom: 2em;
}

.row-add {
  margin-bottom: .5em;
}

.cate-add {
  text-align: center;
  width: 100%;
}

.info-list {
  .inline-input {
    width: 100%;
    height: 1em;
    border: 1px solid #ccc;
  }
}
</style>
