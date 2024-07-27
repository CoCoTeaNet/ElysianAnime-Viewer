import { defineStore } from 'pinia'

/**
 * 定义一个用户信息store
 */
export const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        userinfo: {}
    }),

    getters: {
        token: (state) => state.token,
        userinfo: (state) => state.userinfo
    },

    actions: {
        saveToken: (state, token) => {
            state.token = token;
        },
        saveUserInfo: (state, userinfo) => {
            state.userinfo = userinfo;
        }
    }
})
