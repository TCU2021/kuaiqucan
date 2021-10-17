import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
    },
    component: () => import(/* webpackChunkName: "home" */ '@views/Home.vue'),
  },
  {
    path: '/scan',
    name: 'Scan',
    meta: {
      title: '请扫描二维码',
    },
    component: () => import(/* webpackChunkName: "scan" */ '@views/Scan.vue'),
  },  {
    path: '/besure',
    name: 'Besure',
    meta: {
      title: '确认',
    },
    component: () => import(/* webpackChunkName: "after-scan" */ '@views/AfterScan.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
