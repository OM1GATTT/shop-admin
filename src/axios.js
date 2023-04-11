// 自定义 axios 实例
import axios from "axios";

const service = axios.create({
    baseURL: "https://mock.apifox.cn/m1/2571717-0-default"
})

export default service