import { createApp } from 'vue'
import App from './App.vue'

// ElementPlus相关
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //图标使用->参考官方文档

import 'virtual:windi.css'

import router from './router'


const app = createApp(App)
app.use(router)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.mount('#app')
