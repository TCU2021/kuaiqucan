<template>
  <div class="border">
    <div class="container">
      <div class="wait">
        <div class="title">正在打开摄像头</div>
        <div class="title">请稍后</div>
      </div>
      <div class="qrReader">
        <qr-stream @decode="onDecode" class="camera" v-if="data.show"></qr-stream>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QrStream } from 'vue3-qr-reader'
export default defineComponent({
  components: { QrStream },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const data = reactive({
      result: '',
      show: true,
    })
    const onDecode = (result: any) => {
      data.result = result
    }
    const result = watch(data, () => {
      router.push('/scanInfo')
      // window.location.href = data.result
    })
    const routeWatcher = watch(route, () => {
      if (route.path === '/dScan') {
        data.show = true
      } else {
        data.show = false
      }
    })
    return { data, onDecode }
  },
})
</script>

<style scoped>
.container {
  background-image: url('../../assets/background.jpg');
}
.border,
.container,
.qrReader {
  height: 87vh;
  width: 100%;
}
.wait {
  text-align: center;
  width: 60vw;
  margin-top: 35vh;
  left: 50%;
  margin-left: -30vw;
  position: absolute;
}
.title {
  margin: 20px 0;
  font-size: 30px;
}
.camera {
  z-index: 10;
  height: 100%;
}
</style>
