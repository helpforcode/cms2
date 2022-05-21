<template>
  <div>
    <van-cell-group inset>
      <van-field v-model="form.name" label="Name" placeholder="name"/>
      <van-field v-model="form.code" label="Code" placeholder="code" />
      <van-row v-if="id !== 0">
        <van-col span="18"></van-col>
        <van-col span="6">
          <van-button type="danger" @click="deleteProp">DELETE</van-button>
        </van-col>
      </van-row>

      <bottom-btn :button-click="submit"
                  :back="toList"
                  :split="true"
      >OK</bottom-btn>

    </van-cell-group>

  </div>
</template>

<script>
import BottomBtn from "@/components/BottomBtn";
import prop from "@/api/prop";

export default {
  name: "PropForm",
  components: {
    BottomBtn
  },
  data() {
    return {
      id: 0,
      typeId: 0,
      form: {
        id: Number,
        typeId: Number,
        name: String,
        code: String,
      },
    }
  },
  mounted() {
    this.id = Number(this.$route.params.id)
    this.typeId = Number(this.$route.params.typeId)
    if (this.id !== 0) {
      prop.propDetail(this.id).then(response => {
        let data = response.data.data
        this.form = {
          ...data
        }
      })
    } else {
      // add
      this.form = {
        typeId: this.typeId,
      }
    }
  },
  methods: {
    toList() {
      this.$router.push({name: 'Prop'})
    },
    deleteProp() {
      prop.deleteProp(this.id).then(response => {
        if (response.status === 200) {
          this.toList()
        }
      })
    },
    submit() {
      let params = {
        id: this.id,
        typeId: this.typeId,
        code: this.form.code,
        name: this.form.name,
      }
      let resolve = response => {
        if (response.status === 200) {
          this.toList()
        }
      }
      let reject = error => {
        console.log(error)
      }
      this.id === 0
          ? prop.addProp(params).then(resolve).catch(reject)
          : prop.updateProp(params).then(resolve).catch(reject)
    }
  }

}
</script>

<style scoped>

</style>
