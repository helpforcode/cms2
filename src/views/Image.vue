<template>
  <div>
    <div class="box">
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
    </div>

<!--    <van-uploader-->
<!--        v-model="images"-->
<!--        :show-upload="false"-->
<!--        :deletable="false"-->
<!--    ></van-uploader>-->
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
    }
  }
}
</script>

<style scoped>
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

.box {
  display: flex;
  /*width: 300px;*/
  width: 100%;
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
