<template>
    <div class="cms-info">
        <div class="cate" v-for="(cate) in cates" :key="cate.cateId">
            <div class="info-title">{{cate.cateName}}</div>
            <div class="info-container">
                <van-button type="default" @click="to('InfoForm', {id:0, cateId:cate.cateId})">
                    <span>+</span>
                </van-button>
                <van-row v-for="(info) in cate.infos" :key="info.id"
                         class="info-row"
                         :class="info.visible ? 'visible' : 'invisible'"
                >
                  <van-col span="2">
                    <span class="inline-input code">{{info.code}}</span>
                  </van-col>
                  <van-col span="8">
                    <span class="inline-input tt">{{info.title}}</span>
                  </van-col>
                  <van-col span="6">
                    <span class="inline-input remark">{{info.remark}}</span>
                  </van-col>
                  <van-col span="3">
                    <span class="inline-input state">
                      <span :class="info.state === 1 ? 'active' : info.state === -1 ? 'inactive' : 'default'">
                        {{info.state === 1 ? 'Y' : info.state === -1 ? 'N' : '-'}}
                      </span>
                    </span>
                  </van-col>
                  <van-col span="3">
                    <span class="inline-input visible">
                      {{info.visible}}
                    </span>
                  </van-col>
                  <van-col span="2">
                    <span @click="to('InfoForm', {id:info.id, cateId:cate.cateId})">Edit</span>
                  </van-col>
                </van-row>
            </div>
        </div>
      <div class="cate">
        <van-row>
          <van-col class="cate-add" span="24" @click="to('InfoCateForm', {id:0})">+</van-col>
        </van-row>
        </div>
    </div>
</template>

<script>
import info from "@/api/info"

export default {
    name: 'Info',
    components: {
    },
    data() {
        return {
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
    },
    methods: {
      to(name, params) {
        this.$router.push({name: name, params: params})
      },
    }

}
</script>

<style scoped lang="scss">
.cms-info {
  padding: 3em;
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
.cate {
    border: 1px solid #ccc;
    padding: 1em;
    margin-bottom: 2em;
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
