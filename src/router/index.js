import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '~/pages/index.vue'
import Admin from '~/layout/admin.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
import GoodsList from '~/pages/goodsList.vue'
import SystemSetting from '~/pages/systemSetting.vue'
const routes = [
    {
        path: '/',
        component: Admin,
        children: [
            {
                path: '/',
                component: Index,
                meta: {
                    title: '后台首页'
                }
            },
            {
                path: '/goods/list',
                name: 'goods-list',
                component: GoodsList,
                meta: {
                    title: "商品管理"
                }
            },
            {
                path: '/system/setting',
                name: 'systen-setting',
                component: SystemSetting,
                meta: {
                    title: "系统设置"
                }
            },
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录页'
        }
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    // routes:routes可简写
    routes
})

export default router