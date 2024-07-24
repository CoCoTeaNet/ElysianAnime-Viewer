<template>
  <div class="home-container">
    <ani-card v-for="i in 40" @click="toOpusDetail">
      {{i}}
    </ani-card>
  </div>
</template>

<script setup>
import {ipcApiRoute} from "@/api/main";
import {ipc} from "@/utils/ipcRenderer";
import AniCard from "@/components/ani-card/AniCard.vue";

const toOpusDetail = () => {
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
.home-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>