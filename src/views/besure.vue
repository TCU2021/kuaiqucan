<template>
  <div>
    <div class="container">
      <div class="title">您的外卖当前所在柜门号为：</div>
      <div class="title" style="font-size: 30px">123456</div>
      <div class="title">是否开箱？</div>
      <div class="buttons">
        <van-button class="button" type="primary" @click="sure">确认</van-button>
      </div>
      <div class="buttons">
        <van-button class="button" type="danger" @click="cancel">取消</van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Besure',
  setup() {
    const router = useRouter()
    const sure = () => {
      axios({
        url: 'https://www.baidu.com',
        method: 'post',
        responseType: 'json',
      })
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    const cancel = () => {
      router.push('/')
    }
    return { sure, cancel }
  },
})
</script>

<style scoped>
.container {
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
