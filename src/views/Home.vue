<template>
  <div>
    <div class="background">
      <div class="hello">
        <div class="title">欢迎你：用户名</div>
        <div class="title">当前待取餐：</div>
      </div>
      <div class="todo">
        <div class="content">
          <div class="order">订单编号：1487123172</div>
          <div class="telephone">手机号：156****7452</div>
          <div class="state">当前状态：待取餐</div>
        </div>
      </div>
      <div class="qrReader">
        <qr-stream @decode="onDecode" class="camera"></qr-stream>
        <div class="text">请由此扫描二维码</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { QrStream } from "vue3-qr-reader";

export default defineComponent({
  components: { QrStream },

  setup() {
    const router = useRouter();
    const data = reactive({
      result: "",
      error: "",
    });
    const onDecode = (result: any) => {
      data.result = result;
    };
    const result = watch(data, () => {
      window.location.href=data.result
    });
    return { data, onDecode };
  },
});
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
  height: 85.5vh;
  width: 100vw;
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}

.content {
  margin: 20px auto;
  width: 40vh;
  text-align: left;
}
.title {
  font-size: 30px;
  margin: 10px 0;
}
.order,
.telephone,
.state {
  font-size: 25px;
}
</style>
