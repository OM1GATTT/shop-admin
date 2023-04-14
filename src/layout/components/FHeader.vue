<template>
    <div class="v-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 h-16">
        <div class="v-center text-xl w-48 ml-2">
            <el-icon class="mr-1 text-3xl">
                <ElementPlus></ElementPlus>
            </el-icon>
            极客空间
        </div>

        <el-icon class="icon-btn">
            <Fold></Fold>
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
                        <el-dropdown-item @click="upPassword">修改密码</el-dropdown-item>
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
    <FormDrawer ref="formDrawerRef" destroyOnClose @submit="changePassword">
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
import { useRouter } from 'vue-router'
import { showModel, toast } from "~/composables/util"
import { useAdminStore } from '~/store/index'
import { useFullscreen } from '@vueuse/core'
import { reactive, ref } from 'vue';
import FormDrawer from '../../components/FormDrawer.vue';

const router = useRouter()
// 刷新
const handleRefresh = () => location.reload()
const {
    // 是否全屏状态
    isFullscreen,
    // 切换全屏
    toggle
} = useFullscreen()

const store = useAdminStore()
const { adminInfo } = storeToRefs(store)
const { getInfo, adminLogout, updatePassword } = store
// 登录就根据token获取当前用户信息
getInfo()
// 登出方法
const handleLogout = () => {
    showModel("是否要退出登录?").then(() => {
        adminLogout()
        toast('退出登录成功')
        router.push('/login')
    })
}

// 修改密码相关
const formDrawerRef = ref(null)
const showDrawer = ref(false)
const upPassword = () => {
    formDrawerRef.value.open()
}
const form = reactive(
    {
        oldpassword: '123456',
        password: 'admin',
        repassword: 'admin'
    }
)
const formRef = ref(null)
const loading = ref(false)
const rePassRule = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('确认密码不能为空！'))
    } else if (value !== form.password) {
        callback(new Error('确认密码必须和新密码一致！'))
    } else {
        callback()
    }
}

const rules = {
    oldpassword: [
        {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
        },
    ],
    repassword: [
        {
            validator: rePassRule,
            trigger: 'blur'
        }
    ]
}

const changePassword = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false;
        }
        loading.value = true
        setTimeout(() => {
            updatePassword(form.oldpassword, form.password, form.repassword).then((res) => {
                console.log(res);
                if (res.code == 1) {
                    toast("修改密码成功，请重新登录")
                    showDrawer.value = false
                    // 调用 store 中的 logout 方法
                    adminLogout()
                    // 跳转回登录页
                    router.push("/login")

                } else {
                    toast(res.msg, 'error')
                }
            })
                .finally(() => {
                    loading.value = false
                })
        }, 1000);
    })
}
</script>

<style scoped>
.icon-btn {
    @apply flex justify-center items-center mx-1 cursor-pointer
}

.icon-btn:hover {
    @apply bg-indigo-300
}
</style>