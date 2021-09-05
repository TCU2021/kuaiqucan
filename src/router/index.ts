
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
        path: '/todoList',
        name: 'TodoList',
        component: () => import(/* webpackChunkName: "todo" */ '@/views/TodoList.vue')
    },
    {
        path: '/luckdraw',
        name: 'LuckDraw',
        component: () => import(/* webpackChunkName: "luckdraw" */ '@/views/LuckDraw.vue')
    },
    {
        path: '/address/list',
        name: 'Address',
        component: () => import(/* webpackChunkName: "address" */ '@/views/address/AddressList')
    },
    {
        path: '/address/edit',
        name: 'AddressEdit',
        component: () => import(/* webpackChunkName: "address" */ '@/views/address/AddressEdit')
    },
    {
        path: '/chat/list',
        name: 'Chat',
        component: () => import(/* webpackChunkName: "chatpage" */ '@/views/chat')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router