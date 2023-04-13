// 自定义 axios 实例
import axios from "axios";
import { toast } from "~/composables/util"
import { getToken } from "~/composables/auth";
import { type } from "windicss/utils";

const service = axios.create({
    baseURL: "https://mock.apifox.cn/m1/2571717-0-default"
})

//添加请求拦截
service.interceptors.request.use(function (config) {
    //从 cookie 中取出 token

    const token = getToken()

    // 如果不空，向 header 中添加 token
    if (token) {
        config.headers['token'] = token
    }
    return config;
}, function (error) {
    //对于请求出错，可以做的处理
    return Promise.reject(error)
})

//添加相应拦截
service.interceptors.response.use(function (res) {
    //对响应数据进行数据处理
    return res.data;
}, function (error) {
    //对响应的错误信息进行处理

    toast("请求错误", "error")

    return Promise.reject(error)
})

export default service