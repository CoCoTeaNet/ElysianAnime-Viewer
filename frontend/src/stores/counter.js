// 示例文件路径：
// ./src/stores/counter.js

import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 99,
    }),
    actions: {
        increment() {
            this.count++
            setTimeout(()=>{
                console.log(this.count)
            }, 800)
        },
    },
})