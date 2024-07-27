import {apiGet, apiPost} from '@/utils/requestUtil';

/**
 * 用户获取个人详细信息
 */
export function getDetail() {
    return apiGet('system/user/getDetail', {});
}

/**
 * 更新个人信息
 * @param data
 * @returns {Promise<any>}
 */
export function updateByUser(data) {
    return apiPost('system/user/updateByUser', data);
}

/**
 * 修改个人密码
 * @param data
 * @returns {Promise<any>}
 */
export function doModifyPassword(data) {
    return apiPost('system/user/doModifyPassword', data);
}