import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '~/pages/index.vue'
import Admin from '~/layout/admin.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
import GoodsList from '~/pages/goodsList.vue'
import SystemSetting from '~/pages/systemSetting.vue'
import GoodsSlideshow from '~/pages/goodsSlideshow.vue'
import { Console } from 'windicss/utils'

// 默认路由，所有用户共享
const routes = [
    {
        path: '/',
        name: 'admin',
        component: Admin,
        children: []
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

// 动态路由，根据请求得到的菜单数据，动态添加路由
const asyncRoutes = [
    {
        path: '/',
        name: '/',
        component: Index,
        meta: {
            title: '后台首页'
        }
    },
    {
        path: '/goods/slideshow',
        name: 'goods-slideshow',
        component: GoodsSlideshow,
        meta: {
            title: "商品轮播图管理"
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

export const router = createRouter({
    // routes:routes可简写
    routes,
    history: createWebHashHistory()
})

// 动态添加路由的方法
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) => {

        arr.forEach(e => {
            const item = asyncRoutes.find(obj => obj.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                // 添加嵌套路由，addRoute('父路由name属性',待添加子路由)
                router.addRoute('admin', item)
                hasNewRoutes = true
            }

            if (e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })
        console.log(routes)
    }

    findAndAddRoutesByMenus(menus)

    return hasNewRoutes
}