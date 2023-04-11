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
            <el-form>

                <el-form-item label="Username" placeholder="Username">
                    <el-input />
                </el-form-item>

                <el-form-item label="Password">
                    <el-input type="password" placeholder="Password" />
                </el-form-item>


                <el-form-item>
                    <el-button class="w-full py-4 bg-indigo-600 text-white rounded-full" type="primary"
                        size="default">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>

</script>

<style scoped></style>