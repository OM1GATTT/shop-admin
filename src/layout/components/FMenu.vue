<template>
    <div class="f-menu" :style="{ width: sideWidth }">
        <el-menu :default-active="defaultActive" :collapse="isCollapse" class="border-0" :collapse-transition="false"
            @select="handleSelect">

            <template v-for="(item, index) in menus" :key="index">

                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>

                </el-sub-menu>

                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>

            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '~/store/index'
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addRoutes } from '../../router';
const store = useAdminStore()
const { sideWidth, menus } = storeToRefs(store)

const router = useRouter()
const route = useRoute()

// 默认选中当前路由
const defaultActive = ref(route.path)
console.log(defaultActive)
// 是否折叠
const isCollapse = computed(() => (sideWidth == '220px'))


addRoutes(menus.value)

const handleSelect = (e) => {
    router.push(e)
}
</script>

<style scoped>
.f-menu {
    @apply fixed top-0 left-0 bottom-0 top-16 bg-blue-100 overflow-y-auto overflow-x-hidden transition-all duration-500;
}
</style>