import axios from "~/axios";

export function adminLogin(username, password) {
    return axios.post('/api/admin/login', {
        username, password
    })
}