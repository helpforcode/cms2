<template>
    <div>
        <div class="cate" v-for="(cate, cateIndex) in cates" :key="cate.cateId">
            <div class="info-title">{{cate.cateName}}</div>
            <div class="info-container">
                <van-button type="default" @click="cate.operating ? backToList(cateIndex) : itemPreAdd(cateIndex)">
                    <span v-if="cate.operating">返回</span>
                    <span v-else>添加</span>
                </van-button>
                <div v-if="cate.operating">
                    <van-cell-group inset>
                        <van-field v-model="tmpAdd.code" label="Code" placeholder="code" />
                        <van-field v-model="tmpAdd.name" label="Name" placeholder="name"/>
                        <van-field v-model="tmpAdd.title" label="Title" placeholder="title"/>
                        <van-field v-model="tmpAdd.remark" label="Remark" placeholder="remark"/>
                        <van-field v-model="tmpAdd.state" label="State" placeholder="state"/>
                        <van-field v-model="tmpAdd.visible" label="Visible" placeholder="visible"/>
                        <van-button type="default" @click="itemAdd(cateIndex)">OK</van-button>
                    </van-cell-group>
                </div>
                <div v-else class="info-list">
                    <van-row v-for="(info, infoIndex) in cate.infos" :key="info.id">
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
                            <span class="inline-input state">{{info.state}}</span>
                        </van-col>
                        <van-col span="3">
                            <span class="inline-input visible">{{info.visible}}</span>
                        </van-col>
                        <van-col span="2">
                            <span @click="itemEdit(cateIndex, infoIndex, info)">Edit</span>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>
        <div class="cate">
            <van-row>
                <van-col class="cate-add" span="24">+</van-col>
            </van-row>
        </div>
        <div class="cate">
            TODO: how TODO do?
            动态列表上的Inline edit?

            cat 1
            ----------------
            +
            27 catName title remark Y ON
            26 catName title remark N ON
            24 catName title remark Y OFF

            cat 2
            ----------------
            +
            27 catName title remark Y ON
            26 catName title remark N ON
            24 catName title remark Y OFF

        </div>
    </div>
</template>

<script>
import info from "@/api/info"

export default {
    name: 'Info',
    data() {
        return {
            tmpAdd: {},
            cates: [
                {
                    cateId: 1,
                    cateName: "Monday",
                    operating: false,
                    infos: [
                        {id: 4, code: "004", name:"Newbee", title: "sky bird", remark: "ok", state: 0, visible: false},
                        {id: 3, code: "003", name:"Newbee", title: "apple banana", remark: "ok", state: 0, visible: true},
                        {id: 2, code: "002", name:"Newbee", title: "cat dog", remark: "ok", state: -1, visible: true},
                        {id: 1, code: "001", name:"Newbee", title: "car plane", remark: "ok", state: 1, visible: true},
                    ]
                },
                {
                    cateId: 2,
                    cateName: "Tuesday",
                    operating: false,
                    infos: [
                        {id: 4, code: "004", name:"Tuesday", title: "dog bird", remark: "ok", state: 0, visible: false},
                        {id: 3, code: "003", name:"Tuesday", title: "apple rain", remark: "ok", state: 0, visible: true},
                        {id: 2, code: "002", name:"Tuesday", title: "cat flower", remark: "ok", state: -1, visible: true},
                        {id: 1, code: "001", name:"Tuesday", title: "car air", remark: "ok", state: 1, visible: true},
                    ]
                },
            ]
        }
    },
    mounted() {
        info.all().then(response => {
            let data = response.data.data;
            this.cates = data;
        })
    },
    methods: {
        itemPreAdd(cateIndex) {
            this.cates[cateIndex].operating = true
        },
        backToList(cateIndex) {
            this.cates[cateIndex].operating = false
            this.tmpAdd = {}
        },
        itemAdd(cateIndex) {
            this.cates[cateIndex].infos.push(this.tmpAdd)
            this.cates[cateIndex].operating = false
            this.tmpAdd = {}
        },
        itemEdit(cateIndex, infoIndex, info) {
            this.cates[cateIndex].operating = true
            this.tmpAdd = info 
            console.log(infoIndex)
        },
    }

}
</script>

<style scoped lang="scss">
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