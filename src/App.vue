<template>
  <div class="wrapper">
    <NavBar :title="$route.meta?.title" />
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
    <Tabbar placeholder route v-show="showFooter">
      <TabbarItem icon="home-o" replace to="/">首页</TabbarItem>
      <TabbarItem icon="orders-o" replace to="/about">订单</TabbarItem>
      <TabbarItem icon="user-circle-o" replace to="/todoList">我的</TabbarItem>
      <!-- <TabbarItem icon="setting-o" replace to="/luckdraw">我的</TabbarItem> -->
    </Tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Tabbar, TabbarItem, NavBar, Toast } from "vant";
export default defineComponent({
  name: "App",
  components: {
    Tabbar,
    TabbarItem,
    NavBar,
    Toast,
  },
  computed: {
    showFooter() {
      return this.$route.path.split("/").length < 3;
    },
  },
});
</script>