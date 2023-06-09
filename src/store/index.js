import { defineStore } from "pinia";
import { adminLogin, getInfo, logout, updatepassword } from "../api/admin";
import { setToken, removeToken } from "../composables/auth";

export const useAdminStore = defineStore('admin', {
    state: () => ({
        token: '',
        adminInfo: {},
        sideWidth: '220px',
        menus: []
    }),
    actions: {
        updatePassword(oldpassword, password, repassword) {
            return new Promise((resolve, reject) => {
                updatepassword(oldpassword, password, repassword).then((res) => {
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        adminLogin(username, password) {
            return new Promise((resolve, reject) => {
                adminLogin(username, password).then((res) => {
                    setToken(res.data.token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        async getInfo() {
            const res = await getInfo()
            console.log(res);
            this.adminInfo = res.data.adminInfo
            this.menus = res.data.menus
        },
        async adminLogout() {
            //调用登出接口
            logout()
            //移除 cookie 里的 token
            removeToken()
            //清空状态
            this.adminInfo = {}
        },

        // 侧边栏伸缩
        handleSideWidth() {
            this.sideWidth = this.sideWidth === '220px' ? '80px' : '220px'
        }
    }
})