<template>
  <div class="bottom-bar" @click="buttonClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BottomBtn",
  props: {
    buttonClick: Function
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
  left: 0;
  bottom: 0;
  z-index: 888;

  font-size: 1.2em;
  color: white;
  background: linear-gradient(
      315deg,#498ff2 0%,#4965f2 100%);
}
</style>
