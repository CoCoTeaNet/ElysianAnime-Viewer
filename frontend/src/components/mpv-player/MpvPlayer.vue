<template>
  <div ref="playerRef"
       :class="`mpv-player-layout ${mps.showControl ? '' : 'hide-cursor'}`"
       @keyup.space="onpause"
       @mouseleave="() => mps.showControl = false"
       @mousemove="onMouseMove"
       @mouseenter="onMouseEnter">

    <embed ref="mpvRef" id="mpvjs" type="application/x-mpvjs" wmode="transparent"/>

    <div v-show="mps.showControl" class="mpv-player-control">
      <div class="mpc-left">
        <div class="mp-play" @click="onpause">
          <icon-play v-if="mps.paused"/>
          <icon-paused v-else/>
        </div>
        <div class="micro-box">
          <div class="mp-muted" @click="onMuted">
            <icon-muted v-if="mps.muted"/>
            <icon-volume v-else/>
          </div>
          <div style="width: 100px;padding: 0 0 0 0.5em;">
            <el-slider size="small" v-model="mps.volume" :max="200" @change="onvolumechange" />
          </div>
        </div>
      </div>

      <div style="width: 100%;padding: 0 1em">
        <el-slider size="small" v-model="mps.timePos" :max="mps.duration" @change="onChange" @input="onInput"/>
      </div>

<!--      <div>-->
<!--        <icon-setting/>-->
<!--      </div>-->

      <div class="mp-screen" @click="onFullscreen">
        <icon-screen v-if="!mps.fullscreen"/>
        <icon-screen-close v-else/>
      </div>
    </div>

  </div>
</template>

<script setup>
import {onMounted,onUnmounted, nextTick, watch, reactive,ref} from "vue";
import Mpv from "@/components/mpv-player/mpv";
import IconPlay from "@/components/icon/IconPlay.vue";
import IconPaused from "@/components/icon/IconPaused.vue";
import IconScreen from "@/components/icon/IconScreen.vue";
import IconVolume from "@/components/icon/IconVolume.vue";
import IconSetting from "@/components/icon/IconSetting.vue";
import IconMuted from "@/components/icon/IconMuted.vue";
import IconScreenClose from "@/components/icon/IconScreenClose.vue";
import NoSleep from "nosleep.js"

const props = defineProps(['videoUrl']);

let noSleep = new NoSleep();
let timer;
let mpv;
const mpvRef = ref(null);
const playerRef = ref(null);

const mps = reactive({
  volume: 100,
  paused: true,
  muted: false,
  timePos: 0,
  duration: 0,
  fullscreen: false,
  showControl: true,
});

const firstTimePos = ref(0);

const getTime = () => {
  return mps.timePos;
}

const getPaused = () => {
  return mps.paused;
}

const setTimePos = (time) => {
  firstTimePos.value = time;
}

// 向外暴露方法
defineExpose({
  getTime: getTime,
  getPaused: getPaused,
  setTimePos: setTimePos,
});

onMounted(() => {
});

onUnmounted(() => {
  mpvRef.value.removeEventListener("message", onMessage, false);
})


const onMouseMove = () => {
  if (!mps.showControl) {
    mps.showControl = true;
  } else {
    mouseEnterTimeout();
  }
}

const onMouseEnter = () => {
  mouseEnterTimeout();
}

const mouseEnterTimeout = () => {
  if (timer != null) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    mps.showControl = false;
  }, 2500);
}

const playFile = (src) => {
  mpv.loadFile(src);
  mpv.goPlay(true);
  mps.paused = false;
}

const onpause = () => {
  console.log('paused=' + mps.paused)
  if (mps.paused === true) {
    // 暂停了，那就播放
    mpv.goPlay(true);
    noSleep.enable();
  } else {
    // 暂停
    mpv.goPlay(false);
    noSleep.disable();
  }
  mps.paused = !mps.paused;
}

const onvolumechange = (val) => {
  mpv.setVolume(val);
  mps.muted = val === 0;
}

const onChange = (val) => {
  mps.paused = false;
}

const onInput = (val) => {
  updateTimePos(val);
}

const onMuted = () => {
  if (mps.muted) {
    mps.muted = false;
    mpv.unmute();
  } else {
    mps.muted = true;
    mpv.mute();
  }
}

const onFullscreen = () => {
  mps.fullscreen = !mps.fullscreen;
  if (mps.fullscreen) {
    playerRef.value.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const autoTime = () => {
  if (firstTimePos.value > 0) {
    updateTimePos(firstTimePos.value);
    firstTimePos.value = 0;
  }
}

const updateTimePos = (timePos) => {
  mpv.goPlay(false);
  mpv.setTimePos(timePos);
  mpv.goPlay(true);
}

const onMessage = (e) => {
  const msg = e.data;
  const {type, data} = msg;
  switch (data.name) {
    case 'time-pos':
      autoTime();
      mps.timePos = Math.round(data.value);
      break;
    case 'duration':
      mps.duration = Math.round(data.value);
      break;
  }
}

const onVideoSrcChange = (newVal) => {
  if (mpv) {
    playFile(newVal);
    return;
  }
  nextTick(() => {
    mpv = new Mpv(document.getElementById("mpvjs"));
    mpv.playerReady();
    mpvRef.value.addEventListener('message', onMessage, false);
    setTimeout(() => playFile(newVal), 1000);
  });
}

watch(() => props.videoUrl, onVideoSrcChange);
</script>

<style scoped>
.mpv-player-layout{
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  background-color: black;
  position: relative;
  z-index: 9999;
}

.mpv-player-layout, #mpvjs {
  width: 100%;
  height: 100%;
}

.mpv-player-control {
  width: 100%;
  height: 44px;
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  background-color: rgba(250, 252, 255, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.micro-box {
  display: flex;
  justify-content: stretch;
  align-items: center;
}

.mp-play, .mp-muted, .mp-screen {
  cursor: pointer;
}

.mpc-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/**
 * 隐藏指针
 */
.hide-cursor {
  cursor: none;
}
</style>
