<template>
  <div class="video-container">

    <div class="mpvjs-layout"
         @mouseover="showControl = true"
         @mouseleave="showControl = false"
         @mousemove="onMouseMove"
         @mouseenter="onMouseEnter">

      <div :class="`mpvjs-box ${hideCursor ? 'hide-cursor' : ''}`">
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
import {onMounted, ref, nextTick, watch,} from "vue";
import {FullScreen, Microphone, Mute, Setting, VideoPause, VideoPlay} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";

const route = useRoute();
const url = '';
const iconSize = 22;

let mpv;
let timeout;

// 展示控制面板
const showControl = ref(true);
// 隐藏指针
const hideCursor = ref(false);
// 播放与暂停
const playing = ref(false);
// 音量
const volume = ref(50);

onMounted(() => {
  console.log(route)
});

const onOpusIdChange = (opusId) => {
  console.log(opusId);
}

watch(() => route.query.opusId, onOpusIdChange, {immediate: true});

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

const onMouseMove = () => {
  if (!showControl.value) {
    showControl.value = true;
  } else {
    mouseEnterTimeout();
  }
}

const onMouseEnter = () => {
  mouseEnterTimeout();
}

const mouseEnterTimeout = () => {
  if (timeout != null) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    showControl.value = false;
    hideCursor.value = true;
  }, 2500);
}
</script>

<style scoped>
/**
 * 修改组件样式
 */
.el-slider {
  --el-slider-height: 4px;
  --el-slider-button-size: 12px;
}

/**
 * 隐藏视频控制面板
 */
.hide {
  opacity: 0;
  pointer-events: none;
}

/**
 * 隐藏指针
 */
.hide-cursor {
  cursor: none;
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
  margin-top: 3.5em;
}

/**
 * 视频播放器默认样式
 */
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
