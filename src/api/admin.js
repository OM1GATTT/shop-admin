import axios from "~/axios";

export function adminLogin(username, password) {
    return axios.post('/api/admin/login', {
        username, password
    })
}

export function getInfo() {
    return axios.post("/api/admin/getInfo")
}

export function logout() {
    return axios.post("/api/admin/logout")
}

export function updatepassword(oldpassword, password, repassword) {
    return axios.post("/admin/updatepassword", {
        oldpassword, password, repassword
    })
}