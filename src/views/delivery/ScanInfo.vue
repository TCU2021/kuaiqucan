<template>
  <div>
    <div class="bg">
      <div class="container">
        <div v-if="data.infoLoading">正在查询...</div>
        <div v-else>
          <div class="title">
            当前号<span style="font-size: 30px">1</span>号柜门空闲，正在打开...
          </div>
          <div class="successOpen" v-if="data.onload">
            <div class="title">成功开启</div>
            <div class="camera" @click="openCamera">
              <img src="../../assets/camera.png" />
              <div class="text">请点击拍照</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, watch, nextTick } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'ScanInfo',
  setup() {
    const router = useRouter()
    const data = reactive({
      infoLoading: true,
      onload: false,
    })
    setTimeout(() => {
      data.infoLoading = false
      data.onload = true
    }, 3000)
    const openCamera = () => {
      router.push('/camera')
    }
    return {
      data,
      openCamera,
    }
  },
})
</script>

<style scoped>
.bg {
  height: 87vh;
  width: 100vw;
  background-image: url('../../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.container {
  text-align: center;
  padding-top: 30vh;
}
.title {
  text-align: center;
  padding-bottom: 10px;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
}
.button {
  width: 40vw;
}
</style>
