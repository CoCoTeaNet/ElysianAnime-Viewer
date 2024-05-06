<template>
  <div class="home">
    <h1>home form</h1>
    <el-button @click="onClick()">打开新窗口</el-button>
  </div>
</template>

<script setup>

import {ipcApiRoute} from "@/api/main";
import {ipc} from "@/utils/ipcRenderer";

const onClick = () => {
  let args = {
    type: 'vue',
    content: '/video',
    windowName: 'AnimeVideoIndex',
    windowTitle: 'mpv-player'
  };
  ipc.invoke(ipcApiRoute.createMpv, args).then(id => {
    console.log('[createWindow] id:', id);
  });
}

</script>

<style scoped>

</style>