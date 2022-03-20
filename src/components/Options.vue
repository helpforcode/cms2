<template>
  <div>
    <van-field
        v-model="selectedValue"
        is-link
        readonly
        name="picker"
        :label="label"
        :placeholder="placeholder"
        @click="onClick"
    />
    <van-popup v-model="showPicker" position="bottom" >
      <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Options",
  props: {
    selectedKey: Number,
    items: Array,
    itemKey: String,
    itemValue: String,
    label: String,
    placeholder: String,
  },
  model: {
    prop: 'selectedKey',
    event: 'selected'
  },
  computed: {
    columns: function() {
      // calculate default index
      let defaultIndex = 0
      this.items.forEach((item, i) => {
        if (item[this.itemKey] === this.selectedKey) {
          defaultIndex = i
        }
      })

      // set columns and defaultIndex
      return [{
        values: this.items.map(item => item[this.itemValue]),
        defaultIndex: defaultIndex
      }]
    }
  },
  data() {
    return {
      selectedValue: "",
      showPicker: false,
    }
  },
  watch: {
    items(val) {
      // sometimes this first
      this.initSelected(val)
    },
    selectedKey(key) {
      console.log('key', key)
      // sometimes this first
      this.initSelected(this.items)
    }
  },
  methods: {
    onClick() {
      console.log('click')
      this.showPicker = true
    },
    onConfirm(values, indexes) {
      this.selectedValue = values[0]
      this.showPicker = false
      // event param should be a type of [model.prop.type](here is Number)
      this.$emit('selected', this.items[indexes[0]][this.itemKey])
    },
    initSelected(items) {
      items.forEach(item => {
        // if cate.id === 2
        if (item[this.itemKey] === this.selectedKey) {
          // selectedValue = cate.name
          this.selectedValue = item[this.itemValue]
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
