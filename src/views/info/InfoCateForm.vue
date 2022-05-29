<template>
  <div class="info-cate">
    <van-cell-group inset>
      <van-field v-model="form.name" label="Name" placeholder="name"/>
      <van-field v-model="form.od" label="Order" placeholder="order"/>
      <van-field name="clickable" label="Clickable">
        <template #input>
          <van-switch v-model="form.clickable"></van-switch>
        </template>
      </van-field>
      <bottom-btn :button-click="submit" :split="true">OK</bottom-btn>

    </van-cell-group>

  </div>
</template>

<script>
import BottomBtn from "@/components/BottomBtn";
import {cateAdd, cateUpdate, cateDetail} from "@/api/info";

export default {
  name: "InfoCateForm",
  components: {
    BottomBtn
  },
  data() {
    return {
      id: 0,
      form: {
        id: 0,
        name: "",
        od: 0,
        clickable: false,
      },
    }
  },
  mounted() {
    this.id = Number(this.$route.params.id)
    if (this.id !== 0) {
      cateDetail(this.id).then(response => {
        let data = response.data.data
        this.form = {
          ...data
        }
      })
    } else {
      this.form = {
      }
    }
  },
  methods: {
    submit() {
      let params = this.form
      let resolve = response => {
        if (response.status === 200) {
          this.$router.push({name: 'Info'})
        }
      }
      let reject = error => {
        console.log(error)
      }
      this.id === 0
          ? cateAdd(params).then(resolve).catch(reject)
          : cateUpdate(params).then(resolve).catch(reject)
    }
  }
}
</script>

<style scoped>

</style>
