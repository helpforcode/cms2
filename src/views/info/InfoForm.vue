<template>
  <div>
    <van-cell-group inset>
      <van-field v-model="form.code" label="Code" placeholder="code" />
      <van-field v-model="form.title" label="Title" placeholder="title"/>
      <van-field v-model="form.name" label="Name" placeholder="name"/>
      <van-field v-model="form.remark" label="Remark" placeholder="remark"/>

      <options v-model="form.state"
               :items="states"
               item-key="id"
               item-value="name"
               label="State"
               placeholder="select state"
               @selected="onStateSelected"
      />
      <van-field name="visible" label="Visible">
        <template #input>
          <van-switch v-model="form.visible"></van-switch>
        </template>
      </van-field>

      <div v-if="cate.clickable">
        <quill-editor v-model="form.content"></quill-editor>
      </div>

      <bottom-btn :button-click="submit"
                  :back="toInfo"
                  :split="true"
      >OK</bottom-btn>

    </van-cell-group>

  </div>
</template>

<script>
import Options from "@/components/Options";
import BottomBtn from "@/components/BottomBtn";
import {add, update, detail} from "@/api/info";
import {cateDetail} from "@/api/info";

export default {
  name: "InfoForm",
  components: {
    Options,
    BottomBtn
  },
  data() {
    return {
      id: 0,
      cateId: 0,
      cate: {},
      form: {
        id: Number,
        cateId: Number,
        state: Number,
      },
      states: [
        {id: 1, name: 'Y'},
        {id: -1, name: 'N'},
        {id: 0, name: '-'},
      ],
    }
  },
  mounted() {
    this.id = Number(this.$route.params.id)
    this.cateId = Number(this.$route.params.cateId)
    if (this.id !== 0) {
      detail(this.id).then(response => {
        let data = response.data.data
        this.form = {
          ...data
        }
      })
    } else {
      this.form = {
        cateId: this.cateId,
        state: 1,
        visible: true,
      }
    }

    cateDetail(this.cateId).then(response => {
      let data = response.data.data
      this.cate = {
        ...data
      }
    })
  },
  methods: {
    onStateSelected(w) {
    },
    toInfo() {
      this.$router.push({name: 'Info'})
    },
    submit() {
      let params = {
        id: this.id,
        code: this.form.code,
        title: this.form.title,
        name: this.form.name,
        content: this.form.content,
        cateId: this.form.cateId,
        remark: this.form.remark,
        visible: this.form.visible,
        state: this.form.state,
      }
      let resolve = response => {
        if (response.status === 200) {
          this.$router.push({name: 'Info'})
        }
      }
      let reject = error => {
        console.log(error)
      }
      this.id === 0
          ? add(params).then(resolve).catch(reject)
          : update(params).then(resolve).catch(reject)
    }
  }

}
</script>

<style scoped>

</style>
