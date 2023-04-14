import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia';
import { useAdminStore } from "~/store/index";
import { showModel, toast } from "~/composables/util";
import { reactive, ref } from 'vue';




export function useLogin() {

}

export function useRepassword() {
    const router = useRouter()
    const store = useAdminStore()
    const { adminInfo, sideWidth } = storeToRefs(store)
    const { getInfo, adminLogout, updatePassword, handleSideWidth } = store

    const formDrawerRef = ref(null)
    const openPasswordForm = () => {
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

    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false;
            }
            formDrawerRef.value.showLoading()
            setTimeout(() => {
                updatePassword(form.oldpassword, form.password, form.repassword).then((res) => {
                    console.log(res);
                    if (res.code == 1) {
                        toast("修改密码成功，请重新登录")
                        formDrawerRef.value.close()
                        // 调用 store 中的 logout 方法
                        adminLogout()
                        // 跳转回登录页
                        router.push("/login")

                    } else {
                        toast(res.msg, 'error')
                    }
                })
                    .finally(() => {
                        formDrawerRef.value.hideLoading()
                    })
            }, 1000);
        })
    }

    return {
        formDrawerRef, form, rules, formRef, openPasswordForm, onSubmit
    }
}


export function useLogout() {
    const router = useRouter()
    const store = useAdminStore()
    const { adminLogout } = store

    const handleLogout = () => {
        showModel("是否要退出登录?").then(() => {
            console.log('退出登录成功')
            adminLogout()
            toast('退出登录成功')
            router.push('/login')
        })
    }
    return { handleLogout }
}
