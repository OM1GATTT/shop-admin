<template>
    <div>
        <h2>{{ adminInfo.username }}</h2>
        <img :src="adminInfo.avatar" alt="头像" class="w-32 h-32 rounded-full">
        <el-button class="primary" @click="handleLogout">退出登录</el-button>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { showModel, toast } from "~/composables/util"
import { useAdminStore } from '~/store/index'

const router = useRouter()

const store = useAdminStore()
const { adminInfo } = storeToRefs(store)
const { getInfo, adminLogout } = store

getInfo()

const handleLogout = () => {
    showModel("是否要退出登录?").then(() => {
        adminLogout()
        toast('退出登录成功')
        router.push('/login')
    })
}
</script>

<style  scoped>
/* .btn {
    @apply bg-red-500 text-white px-10 py-2 rounded-full hover: (bg-red-700) focus:(ring-8 ring-red-400) transition-all duration-500
} */
</style>