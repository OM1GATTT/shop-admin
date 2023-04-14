<template>
    <div class="v-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 h-16">
        <div class=" bg-blue-300 h-full v-center text-xl w-48 pl-2">
            <el-icon class="mr-1 text-3xl">
                <ElementPlus></ElementPlus>
            </el-icon>
            极客空间
        </div>

        <el-icon class="bg-blue-300 h-full v-center w-7 " @click="handleSideWidth">
            <Fold v-if="sideWidth === '220px'"></Fold>
            <Expand v-else></Expand>
        </el-icon>

        <div class="v-center ml-auto">
            <el-icon class="icon-btn" @click="handleRefresh">
                <Refresh></Refresh>
            </el-icon>
            <el-icon class="icon-btn" @click="toggle">
                <FullScreen v-if="!isFullscreen"></FullScreen>
                <Aim v-else></Aim>
            </el-icon>
            <el-icon class="icon-btn">
                <Printer></Printer>
            </el-icon>
            <el-icon class="icon-btn">
                <Setting></Setting>
            </el-icon>

            <el-dropdown class="f-center mx-5 h-64 cursor-pointer">
                <span class="v-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="adminInfo.avatar"></el-avatar>
                    {{ adminInfo.username }}
                    <el-icon class="el-icon-right">
                        <arrow-down></arrow-down>
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="openPasswordForm">修改密码</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>

            </el-dropdown>
        </div>
    </div>

    <!-- <el-drawer title="修改密码" v-model="showDrawer" size="30%" :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input placeholder="请输入旧密码" v-model="form.oldpassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input type="password" placeholder="请确认密码" v-model="form.repassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="changePassword" :loading="loading"
                    class="bg-indigo-500 text-light-50 w-full p-4 rounded-full">提交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer> -->
    <FormDrawer ref="formDrawerRef" title="修改密码" size="30%" @submit="onSubmit">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input placeholder="请输入旧密码" v-model="form.oldpassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input type="password" placeholder="请确认密码" v-model="form.repassword"></el-input>
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '~/store/index'
import { useFullscreen } from '@vueuse/core'

import FormDrawer from '../../components/FormDrawer.vue';
import { useLogout, useRepassword } from '~/composables/useAdmin'


// 刷新
const handleRefresh = () => location.reload()

const {
    // 是否全屏状态
    isFullscreen,
    // 切换全屏
    toggle
} = useFullscreen()


const store = useAdminStore()
const { adminInfo, sideWidth } = storeToRefs(store)
const { getInfo, handleSideWidth } = store

// 登录就根据token获取当前用户信息
getInfo()
// 登出方法
const { handleLogout } = useLogout()
// 修改密码相关
const {
    formDrawerRef,
    form,
    rules,
    formRef,
    openPasswordForm,
    onSubmit
} = useRepassword()
</script>

<style scoped>
.icon-btn {
    @apply flex justify-center items-center mx-1 cursor-pointer
}

.icon-btn:hover {
    @apply bg-indigo-300
}
</style>