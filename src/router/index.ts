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
  },
  {
    path: '/besure',
    name: 'Besure',
    meta: {
      title: '确认',
    },
    component: () => import(/* webpackChunkName: "after-scan" */ '@views/besure.vue'),
  },
  {
    path: '/dHome',
    name: 'DHome',
    meta: {
      title: '首页',
    },
    component: () => import(/* webpackChunkName: "dHome" */ '@views/delivery/Home.vue'),
  },
  {
    path: '/dScan',
    name: 'DScan',
    meta: {
      title: '请扫描二维码',
    },
    component: () => import(/* webpackChunkName: "Scan" */ '@views/delivery/Scan.vue'),
  },
  {
    path: '/scanInfo',
    name: 'ScanInfo',
    meta: {
      title: '柜门信息',
    },
    component: () => import(/* webpackChunkName: "" */ '@views/delivery/ScanInfo.vue'),
  },
  {
    path: '/camera',
    name: 'Camera',
    meta: {
      title: '请拍照',
    },
    component: () => import(/* webpackChunkName: "" */ '@views/delivery/Camera.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
