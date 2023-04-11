import { ElNotification } from "element-plus";

// 封装消息提示组件
export function toastSuccess(message, type = "success") {
    ElNotification({
        message,
        type,
        duration: 2000
    })
}

export function toast(message, type = "success") {
    ElNotification({
        message,
        type,
        duration: 2000
    })
}

export function toastError(message, type = "error") {
    ElNotification({
        message,
        type,
        duration: 2000
    })
}