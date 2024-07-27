import {defineStore} from 'pinia'
import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";

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
        userinfo: (state) => state.userinfo,
    },

    actions: {
        loadToken() {
            ipc.invoke(ipcApiRoute.getCache, 'token').then(resp => {
                this.token = resp;
            });
        },
        save() {
            console.log('this.token='+this.token)
        },
        saveToken(token) {
            this.token = token;
            let args = {
                key: 'token',
                value: token
            }
            ipc.invoke(ipcApiRoute.cache, args).then((resp) => {
            });
        },
        saveUserinfo(userinfo) {
            this.userinfo = userinfo;
        }
    }
})
