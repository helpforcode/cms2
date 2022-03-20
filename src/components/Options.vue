<template>
  <div>
    <van-field
        v-model="selectedValue"
        is-link
        readonly
        name="picker"
        label="Picker"
        placeholder="Select"
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
    selectedItem: Number,
    items: Array,
    itemKey: String,
    itemValue: String,
  },
  model: {
    prop: 'selectedItem',
    event: 'selected'
  },
  computed: {
    columns: function() {
      return this.items.map(item => item[this.itemValue])
    }
  },
  data() {
    return {
      selectedValue: "",
      showPicker: false,
    }
  },
  methods: {
    onClick() {
      console.log('click')
      this.showPicker = true
    },
    onConfirm(value, index) {
      this.selectedValue = value
      this.showPicker = false
      // event param should be a type of [model.prop.type](here is Number)
      this.$emit('selected', this.items[index][this.itemKey])
    }
  }

}
</script>

<style scoped>

</style>
