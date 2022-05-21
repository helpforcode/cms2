<template>
  <div>
    <van-cell-group inset>
      <van-field v-model="form.name" label="Name" placeholder="name"/>
      <van-row v-if="id !== 0">
        <van-col span="18"></van-col>
        <van-col span="6">
          <van-button type="danger" @click="deletePropType">DELETE</van-button>
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
  name: "PropTypeForm",
  components: {
    BottomBtn
  },
  data() {
    return {
      id: 0,
      form: {
        id: 0,
        name: "",
      },
    }
  },
  mounted() {
    this.id = Number(this.$route.params.id)
    if (this.id !== 0) {
      prop.propTypeDetail(this.id).then(response => {
        let data = response.data.data
        this.form = {
          ...data
        }
      })
    }
  },
  methods: {
    toList() {
      this.$router.push({name: 'Prop'})
    },
    deletePropType() {
      prop.deletePropType(this.id).then(response => {
        if (response.status === 200) {
          this.toList()
        }
      })
    },
    submit() {
      let params = {
        id: this.id,
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
          ? prop.addPropType(params).then(resolve).catch(reject)
          : prop.updatePropType(params).then(resolve).catch(reject)
    }
  }

}
</script>

<style scoped>

</style>
