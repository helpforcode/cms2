<template>
  <div>
    <div class="bottom-bar left" @click="buttonClick"
         :class="classObject"
    >
      <slot></slot>
    </div>
    <div v-show="split" class="bottom-bar right" @click="goBack()">RETURN</div>
  </div>
</template>

<script>
export default {
  name: "BottomBtn",
  props: {
    buttonClick: Function,
    split: Boolean,
    back: Function
  },
  methods: {
    goBack() {
      console.log(this.back)
      this.back !== undefined ? this.back() : this.$router.back()
    }
  },
  computed: {
    classObject: function() {
      return {
        bar_split: this.split
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 100%;

  border: 1px solid #eee;
  box-sizing: border-box;

  position: fixed;
  bottom: 0;
  z-index: 888;

  font-size: 1.2em;
  color: white;
}
.bottom-bar.left {
  background: linear-gradient(
      315deg,#498ff2 0%,#4965f2 100%);
}
.bottom-bar.left.bar_split {
  left: 0;
  width: 50%;
}
.bottom-bar.right {
  right: 0;
  width: 50%;
  background: linear-gradient(
      315deg, #b0c0d5 0%, #ced2e3 100%);
}
</style>
