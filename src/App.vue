<template>
  <div class="wrapper">
    <NavBar title="标题" left-text="返回" right-text="按钮" left-arrow />
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
    <Tabbar placeholder route v-show="showFooter">
      <TabbarItem icon="home-o" replace to="/">Home</TabbarItem>
      <TabbarItem icon="search" replace to="/about">About</TabbarItem>
      <TabbarItem icon="friends-o" replace to="/todoList">ToDo</TabbarItem>
      <TabbarItem icon="setting-o" replace to="/luckdraw">LuckDraw</TabbarItem>
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
    Toast
  },
  methods: {
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
  },
  computed: {
    showFooter() {
      return this.$route.path.split("/").length < 3;
    },
  }
})
</script>