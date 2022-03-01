<template>
  <div>

    <div class="box-x">
      <div class="box-x-item"
           v-for="(photo, i) in checkedImages"
           v-bind:key="photo.id"
      >
        <van-image fit="cover" width="100%" height="100%"
                   :src="photo.url"
                   @click="preview(photo.url)"
        >
          <span class="top-right-icon">
            <i
                @click="removeChecked(i, photo)"
                class="van-icon van-icon-cross"></i>
          </span>
        </van-image>
      </div>
    </div>

    <van-cell is-link @click="showPopup">show popup</van-cell>

    <van-popup v-model="popup" position="bottom" :style="{height: '40%'}">
      <div class="box-container">
        <div class="box">
          <van-divider dashed class="divider" content-position="center">Select images</van-divider>
          <div class="item"
               v-for="(photo, i) in images"
               v-bind:key="photo.id"
               @click="selectImage(i, photo)"
               @keypress="preview(photo.url)"
          >
            <van-image
                data-text=""
                class="img-box"
                fit="cover"
                width="100%" height="100%" :src="photo.url">

              <span class="mask" v-show="photo.checked">
                <i class="van-icon van-icon-passed"></i>
              </span>
            </van-image>
          </div>
          <van-divider class="divider" content-position="center">End</van-divider>
        </div>
        <div class="box-bar" @click="confirm">OK</div>
      </div>

    </van-popup>

  </div>
</template>

<script>
import Img from '@/api/image'
import {ImagePreview} from 'vant'
export default {
 name: "Photo",
  data() {
    return {
      images: [],
      checkedImages: [],
      popup: false,
    }
  },
  mounted() {
   this.listImage()
  },
  methods: {
    listImage() {
      Img.list().then(response => {
        console.log(response)
        this.images = response.data.data.content
      }).catch(err => {
        console.log(err)
      })
    },
    preview(url) {
      ImagePreview([url])
    },
    selectImage(i, image) {
      image.checked = !image.checked
      this.$set(this.images, i, image)
    },
    showPopup() {
      this.listImage()
      this.popup = true
    },
    confirm() {
      this.checkedImages = this.images.filter(img => img.checked)
      this.popup = false
    },
    removeChecked(i, image) {
      console.log(image)
      this.checkedImages.splice(i, 1);
    }
  }
}
</script>

<style scoped>
.divider {
  width: 100%
}
.box-x {
  display: flex;
  flex-wrap: wrap;
}
.box-x-item {
  display: flex;
  height: 5em;
  width: 25%;
  position: relative;
}
.box-x-item .top-right-icon {
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 14px;
  height: 14px;
  border-radius: 0 0 0 12px;
}
.top-right-icon i {
  position: absolute;
  top: -2px;
  right: -2px;
  color: white;
  z-index: 888;
  transform: scale(0.5);
}
.img-box {
  position: relative;
  display: flex;
}
.img-box i {
  position: absolute;
  right: 1px;
  bottom: 1px;
  font-size: 2em;
  font-weight: bold;
  z-index: 999;
  color: white;
}
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: block;
}
.box-container {
  position: relative;
  height: 100%;
}

.box {
  display: flex;
  /*width: 300px;*/
  width: 100%;
  /*height: 12em;*/
  height: calc(100% - 2em);
  overflow: scroll;
  /*height: 300px;*/
  flex-flow: wrap;
  /*flex-wrap: wrap;*/
  /*flex-direction: column;*/
  /*flex-direction: row-reverse;*/
  /*justify-content: space-around;*/
  /*justify-content: space-between;*/
  /*justify-content: center;*/
  /*align-items: stretch;*/
  align-content: flex-start;
  /*align-content: stretch;*/
  /*align-items: flex-start;*/
}
.box-bar {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 2em;
  width: 100%;

  border: 1px solid #eee;
  box-sizing: border-box;

  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 888;

  font-size: 1.2em;
  color: white;
  background: linear-gradient(
      315deg,#498ff2 0%,#4965f2 100%);
}
.item {
  background-color: #f1f8f4;
  /*border: 1px solid #a0c1a7;*/
  height: 5em;
  width: 33.33%;
}
.item:last-child {
  align-self: flex-end;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item > span {
  font-size: 2em;
}
/*自动序号*/
.box {
  counter-reset: sectioncounter;
}
.item > span:before {
  content: counter(sectioncounter);
  counter-increment: sectioncounter;
}
</style>
