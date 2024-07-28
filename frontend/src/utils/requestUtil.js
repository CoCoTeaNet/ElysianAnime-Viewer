import router from "@/router";
import {useUserStore} from "@/stores/user";
import {ipcApiRoute} from "@/api/main";
import {ipc} from "@/utils/ipcRenderer";

const store = useUserStore();

const post = 'POST';
const get = 'GET';

export const ResultCode = {
    /**
     * 成功
     */
    SUCCESS: 200,
    /**
     * 内部错误
     */
    ERROR: 500,
    /**
     * 未找到资源
     */
    NOT_FOUNT: 404,
    /**
     * 拒绝请求
     */
    REFUSE: 401,
    /**
     * 未登录
     */
    NOT_LOGIN: 4001,
    /**
     * 无权限访问
     */
    NOT_PERMISSION: 4002,
    /**
     * token失效
     */
    TOKEN_INVALID: 4003
}

const defaultOptions = {
    method: 'GET',
    data: {},
    dataType: 'json',
    timeout: 60000,
    headers: {
        "Content-Type": 'application/json;charset=utf-8',
        "Authorization": '-',
    }
}

/**
 * 封装axios
 *
 * @param url 请求地址
 * @param data 参数
 * @param method 请求方法
 */
export async function request(url, data, method) {
    let options = {};
    Object.assign(options, defaultOptions);
    options.method = method;
    options.data = data;

    if (!store.token) {
        await store.loadToken();
    }

    options.headers["Authorization"] = store.token;

    let args = {
        url: '/api/' + url,
        options: options,
    }

    console.log(`requestUtil[${url}] >>>>> args:`, args);
    let res = await ipc.invoke(ipcApiRoute.curl, JSON.stringify(args));

    // if (res.data.code === ResultCode.NOT_LOGIN) {
    //     await router.push({name: 'LoginIndex'});
    // }

    console.log(`requestUtil[${url}] >>>>> res:`, res);

    return res;
}

export async function apiGet(url) {
    return request(url, null, get);
}

export async function apiPost(url, data) {
    return request(url, data, post);
}