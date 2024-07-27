import {ElMessage} from "element-plus";

const info = (message) => {
    ElMessage({
        message: message,
        type: 'info',
    })
}

const warning = (message) => {
    ElMessage({
        message: message,
        type: 'warning',
    })
}

const error = (message) => {
    ElMessage({
        message: message,
        type: 'error',
    })
}

const success = (message) => {
    ElMessage({
        message: message,
        type: 'success',
    })
}

const Toast = {
    info: info,
    warning: warning,
    error: error,
    success: success,
}

export default Toast;