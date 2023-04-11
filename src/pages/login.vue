<template>
    <el-row class="w-full h-screen">
        <el-col :span="16" class="bg-indigo-500 flex flex-col text-white justify-center items-center">
            <p class="text-light-50 text-5xl font-bold">shop admin</p>
            <p class="text-3xl">shop admin</p>
        </el-col>
        <el-col :span="8" class="flex flex-col justify-center items-center">
            <h2 class="bg-gary-500">后台登录</h2>

            <div class="flex justify-center items-center my-5 space-y-2">
                <span class="h-[1px] w-16 bg-gray-400"></span>
                <span>账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-400"></span>
            </div>

            <el-form :model="form" :rules="rules" ref="formRef">
                <el-form-item label="Username" prop="username">
                    <el-input placeholder="Username" v-model="form.username">
                        <template #prefix>
                            <el-icon>
                                <user />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="Password" prop="password">
                    <el-input type="password" placeholder="Password" v-model="form.password">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>


                <el-form-item>
                    <el-button @click="onSubmit" class="w-full py-4 bg-indigo-600 text-white rounded-full" type="primary"
                        size="default">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { adminLogin } from '~/api/http'
import { useRouter } from 'vue-router'
import { setToken } from "~/utils/auth";
import { toastSuccess } from "~/utils/toast"
import { useAdmin } from '~/store/index'

const router = useRouter()

const store = useAdmin()
const { setStoreToken } = store

const form = reactive({
    username: 'admin',
    password: '123456'
})

const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }
    ]
}

const formRef = ref(null)

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false;
        }

        // 发请求
        console.log('验证通过')
        adminLogin(form.username, form.password)
            .then((res) => {
                console.log(res);
                // 提示登录成功
                if (res.code == 1) {

                    //将 token 存入cookie
                    setToken(res.data.token)
                    setStoreToken(res.data.token)
                    //弹窗提示
                    toastSuccess("登录成功")
                }

                router.push('/')
            })

        // .catch((err) => {
        //     ElNotification({
        //         message: '登录失败',
        //         type: 'error',
        //         duration: 2000
        //     })
        //     console.log(err)
        // })
    })
}
</script>

<style scoped></style>