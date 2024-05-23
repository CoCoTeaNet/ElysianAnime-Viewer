<template>
  <div class="video-container">

    <div class="mpvjs-layout">

      <embed id="mpvjs" type="application/x-mpvjs"/>

      <div class="mpvjs-control-layout">
        <div class="mpvjs-control-panel">
          <div>
            <el-icon :size="24" @click="play">
              <VideoPlay v-if="!playing"/>
              <VideoPause v-else/>
            </el-icon>
          </div>
          <div>
            <span>音量</span>
          </div>
        </div>
      </div>

    </div>

    <div>
      <h1>番剧信息 right</h1>
      <h1>番剧信息 right</h1>
      <h1>番剧信息 right</h1>
    </div>

  </div>
</template>

<script setup>
import Mpv from "@/views/anime/video/mpv";
import {onMounted, ref, nextTick} from "vue";
import {VideoPause, VideoPlay} from "@element-plus/icons-vue";

const url = '';

let mpv;

// 播放与暂停
const playing = ref(false);

onMounted(() => {
});

nextTick(() => {
  mpv = new Mpv(document.getElementById("mpvjs"));
  setTimeout(() => {
    mpv.loadFile(url);
  }, 1000);
});

const play = () => {
  let newStatus = !playing.value;
  mpv.goPlay(newStatus);
  playing.value = newStatus;
}
</script>

<style scoped>
.video-container {
  height: 100%;
  display: flex;
}

.mpvjs-layout {
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#mpvjs {
  width: 100%;
  height: 100%;
}

.mpvjs-control-layout {
  background-color: whitesmoke;
  width: 100%;
  z-index: 999;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.mpvjs-control-panel {
  display: flex;
  justify-content: space-between;
}
</style>
