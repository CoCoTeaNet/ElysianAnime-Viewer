import {apiGet, apiPost} from '@/utils/requestUtil';

const sysLoginApi = {
    captcha: getCaptcha,
    login: login,
    logout: logout,
    loginInfo: loginInfo,
}

export function getCaptcha(data) {
    return apiGet(`system/captcha?timestamp=${data}`, {});
}

/**
 * 用户登录
 */
export function login(data) {
    return apiPost('system/login', data);
}

/**
 * 获取用户登录信息
 */
export function loginInfo() {
    return apiGet('system/loginInfo');
}

/**
 * 用户退出登录
 */
export function logout() {
    return apiPost('system/logout');
}

export default sysLoginApi;