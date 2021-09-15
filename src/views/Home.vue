<template>
  <div>
    <div class="background">
      <div class="hello">
        <div class="title">欢迎你：{{ data.user.username }}</div>
        <div class="title">当前待取餐：</div>
      </div>
      <div class="todo">
        <div class="content">
          <div class="order">订单编号：{{ data.user.todo.oid }}</div>
          <div class="telephone">手机号：{{ data.user.todo.telephone }}</div>
          <div class="state">当前状态：{{ data.user.todo.state }}</div>
        </div>
      </div>
      <div class="qrReader">
        <div class="qrBg" @click="toScan"></div>
        <div class="qrIcon">
          <img src="../assets/scan_icon.png" />
          <div class="text">请点击此处扫描二维码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const data = reactive({
      result: '',
      error: '',
      user: {
        username: '用户名',
        todo: {
          oid: '1487123172',
          telephone: '156****7452',
          state: '待取餐',
        },
      },
    })
    const toScan = () => {
      router.push('/scan')
    }
    return { data, toScan }
  },
})
</script>

<style scoped>
* {
  font-size: 16px;
}
.camera {
  height: 60%;
  width: 60%;
  margin: 20px auto;
}
.qrReader {
  text-align: center;
  margin: 50px 0;
}
.background {
  height: 87vh;
  width: 100vw;
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}

.content {
  margin: 20px auto;
  width: 40vh;
  text-align: left;
}
.hello {
  padding: 20px;
}
.title {
  font-size: 30px;
}
.order,
.telephone,
.state {
  font-size: 25px;
}
.qrBg {
  left: 50%;
  width: 40vh;
  height: 40vh;
  margin-left: -20vh;
  position: absolute;
  border-radius: 20px;
  opacity: 20%;
  background-color: white;
}
.qrIcon {
  height: 30vh;
  padding: 5vh;
  margin: 0 8vh;
}
</style>
