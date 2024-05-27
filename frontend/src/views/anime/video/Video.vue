<template>
  <div class="video-container">

    <div class="mpvjs-layout" @mouseover="showControl = true" @mouseleave="showControl = false">

      <div class="mpvjs-box">
        <embed id="mpvjs" type="application/x-mpvjs"/>
      </div>

      <div :class="`mpvjs-control-layout ${showControl ? '' : 'hide'}`">
        <div class="mpvjs-control-progress">
          <el-progress text-inside :show-text="false" :percentage="10"/>
        </div>

        <div class="mpvjs-control-panel">
          <el-space>
            <el-icon :size="iconSize" @click="play">
              <VideoPlay v-if="!playing"/>
              <VideoPause v-else/>
            </el-icon>

            <el-space>
              <el-icon :size="iconSize">
                <Microphone v-if="volume > 0"/>
                <Mute v-else/>
              </el-icon>
              <el-slider style="width: 100px"
                         height="10px"
                         input-size="small"
                         size="small"
                         v-model="volume"
                         @change="onVolumeChange"/>
            </el-space>
          </el-space>

          <el-space>
            <el-icon :size="iconSize">
              <Setting/>
            </el-icon>
            <el-icon :size="iconSize">
              <FullScreen/>
            </el-icon>
          </el-space>
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
import {FullScreen, Microphone, Mute, Setting, VideoPause, VideoPlay} from "@element-plus/icons-vue";

const url = 'http://ani.live1024.cn:5000/api/anime/opus/media/1170394348459397120?resName=28.mp4';
const iconSize = 22;

let mpv;

// 是否展示控制面板
const showControl = ref(true);
// 播放与暂停
const playing = ref(false);
// 音量
const volume = ref(50);

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

const onVolumeChange = (value) => {
}
</script>

<style scoped>
.el-slider {
  --el-slider-height: 4px;
  --el-slider-button-size: 12px;
}

.hide {
  opacity: 0;
  pointer-events: none;
}

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

.mpvjs-box {
  width: 100%;
  height: 100%;
}

.mpvjs-control-layout {
  background-color: rgb(44 44 44 / 29%);
  z-index: 999;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.5em;
}

.mpvjs-control-panel {
  display: flex;
  justify-content: space-between;
}

.mpvjs-control-progress {
  margin-bottom: 0.5em;
}
</style>
