<template>
  <div>
    <div class="container">
      <div v-if="!data.isEnd">
        <div class="waitting" v-if="data.loadingVideo">正在加载相机</div>
        <div class="camera_outer" v-else>
          <video id="videoCamera" autoplay></video>
          <canvas style="display: none" id="canvasCamera"></canvas>
          <div v-if="data.imgSrc" class="img_bg_camera">
            <img :src="data.imgSrc" class="tx_img" />
          </div>
          <img
            src="../../assets/confirm.png"
            class="setImage"
            @click="setImage()"
            v-show="!data.isPhoto"
          />
          <div v-show="data.isPhoto" class="setImage">
            <div class="title">是否提交</div>
            <div class="buttons">
              <van-button class="button" type="success" @click="end">是</van-button>
              <van-button
                class="button"
                @click="
                  () => {
                    initData()
                    openCamera()
                  }
                "
                >否</van-button
              >
            </div>
          </div>
        </div>
      </div>
      <div v-else class="endTitle">感谢你的配送</div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, watch, nextTick, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'Camera',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      loadingVideo: true,
      isPhoto: false,
      isEnd: false,
    })
    const initData = () => {
      data.loadingVideo = true
      data.isPhoto = false
      data.thisCancas = null
      data.thisContext = null
      data.thisVideo = null
      data.imgSrc = ''
    }
    const openCamera = () => {
      setTimeout(() => {
        data.loadingVideo = false
        nextTick(() => {
          data.thisCancas = document.getElementById('canvasCamera')
          data.thisContext = data.thisCancas.getContext('2d')
          data.thisVideo = document.getElementById('videoCamera')
          // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
          if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {}
          }
          // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
          // 使用getUserMedia，因为它会覆盖现有的属性。
          // 这里，如果缺少getUserMedia属性，就添加它。
          if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
              // 首先获取现存的getUserMedia(如果存在)
              var getUserMedia =
                navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
              // 有些浏览器不支持，会返回错误信息
              // 保持接口一致
              if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
              }
              // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
              return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject)
              })
            }
          }
          var constraints = {
            audio: false,
            video: { width: 200, height: 300 },
          }
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
              // 旧的浏览器可能没有srcObject
              if ('srcObject' in data.thisVideo) {
                data.thisVideo.srcObject = stream
              } else {
                // 避免在新的浏览器中使用它，因为它正在被弃用。
                data.thisVideo.src = window.URL.createObjectURL(stream)
              }
              data.thisVideo.onloadedmetadata = function (e) {
                data.thisVideo.play()
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
      }, 1000)
    }
    nextTick(() => {
      openCamera()
    })
    const routerWatcher = watch(route, () => {
      console.log(route.path)
      if (route.path !== '/camera') {
        data.thisVideo.srcObject.getTracks()[0].stop()
      } else {
        data.loadingVideo = true
        setTimeout(() => {
          nextTick(() => {
            data.loadingVideo = false
            nextTick(() => {
              console.log(123)
              openCamera()
            })
          })
        }, 1000)
      }
    })
    const end = () => {
      data.isEnd = true
    }
    return {
      data,
      openCamera,
      initData,
      end,
    }
  },

  methods: {
    //  绘制图片（拍照功能）
    setImage() {
      let data = this.data
      data.isPhoto = true
      console.log(data.thisCancas.width)
      // 点击，canvas画图
      data.thisContext.drawImage(
        data.thisVideo,
        0,
        0,
        data.thisCancas.width,
        data.thisCancas.height
      )
      // 获取图片base64链接
      var image = data.thisCancas.toDataURL('image/png')
      data.imgSrc = image
      // this.$emit('refreshDataList', data.imgSrc)
      data.thisVideo.srcObject.getTracks()[0].stop()
    },
    // base64转文件
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
  },
})
</script>

<style scoped>
.title {
  margin: 0 auto;
  text-align: center;
  width: 20vw;
  background: white;
}
.container {
  height: 87vh;
  width: 100vw;
  background-image: url('../../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.endTitle {
  padding-top: 40vh;
  text-align: center;
  font-size: 30px;
}
.buttons {
  padding-top: 2vh;
  display: flex;
  justify-content: center;
}
.button {
  margin: 0 10px;
  width: 100px;
}
.tx_img {
  width: 100vw;
  height: 70vh;
}
.setImage {
  position: absolute;
  height: 50px;
  top: 60vh;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 0;
}
#videoCamera,
#canvasCamera {
  width: 100vw;
}
.camera_outer {
  position: relative;
  overflow: hidden;
  background: no-repeat center;
  background-size: 100%;
}
video,
canvas,
.tx_img {
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
}
.btn_camera {
  position: absolute;
  bottom: 4px;
  left: 0;
  right: 0;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  line-height: 50px;
  text-align: center;
  color: #ffffff;
}
.bg_r_img {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}
.img_bg_camera {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}
.img_btn_camera {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
}
.loding_img {
  width: 50px;
  height: 50px;
}
</style>
