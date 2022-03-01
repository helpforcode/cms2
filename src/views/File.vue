<template>
  <div>
    <van-uploader
        :after-read="afterRead"
        v-model="fileList"
        :before-delete="remove"
    ></van-uploader>
  </div>
</template>

<script>

import Img from '@/api/image'
import toast from '@nutui/nutui/dist/packages/toast'

export default {
  name: "File",
  data() {
    return {
      fileList: []
    }
  },
  mounted() {
    this.listImage()
  },
  methods: {
    listImage() {
      Img.list().then(response => {
        this.fileList = response.data.data.content

      }).catch(err => {
        console.log(err)
      })
    },
    afterRead(file) {
      console.log(file)
      let that = this
      let img = new Image()
      img.src = file.content
      let reader = new FileReader()
      reader.readAsDataURL(file.file)
      img.onload = function() {
        let image = that.compress(img)
        const formData = new FormData()
        const imgName = new Date().getTime() + '.png'
        formData.append("file", that.dataURLtoBlob(image), imgName)
        Img.upload(formData).then(response => {
          let data = response.data.data;
          that.fileList.concat(data)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    remove(file) {
      Img.remove(file.id).then(response => {
        console.log(response)
        toast.success("Image removed.")
        this.listImage()
      }).catch(err => {
        console.log(err)
      })
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    },
    compress(img) {
      let url = ''
      var w = Math.min(700, img.width);//当图片像素>700的时候，等比例压缩，这个数字可以调
      var h = img.height * (w / img.width);
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      canvas.width = w
      canvas.height = h
      ctx.drawImage(img, 0, 0, w, h)
      url = canvas.toDataURL('image/png', 1)//1代表精细度，越高越好
      return url
    }
  }
}
</script>

<style scoped>

</style>
