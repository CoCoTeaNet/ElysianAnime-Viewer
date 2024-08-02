<template>
  <div ref="playerRef" class="mpv-player-layout" @keyup.space="onpause">
    <embed ref="mpvRef" id="mpvjs" type="application/x-mpvjs"/>

    <div class="mpv-player-control">

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
          <div style="width: 100px;padding: 0 1em;">
            <el-slider size="small" v-model="mps.volume" :max="200" @change="onvolumechange" />
          </div>
        </div>
      </div>

      <div style="width: 100%;padding: 0 1em 0 1em">
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

const props = defineProps(['videoUrl']);

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
});

onMounted(() => {
});

onUnmounted(() => {
  mpvRef.value.removeEventListener("message", onMessage, false);
})

const playFile = (src) => {
  console.log('source=' + src)
  mpv.loadFile(src);
  mpv.goPlay(true);
  mps.paused = false;
}

const onpause = () => {
  console.log('paused=' + mps.paused)
  if (mps.paused === true) {
    // 暂停了，那就播放
    mpv.goPlay(true);
  } else {
    // 暂停
    mpv.goPlay(false);
  }
  mps.paused = !mps.paused;
}

const onvolumechange = (val) => {
  mpv.setVolume(val);
  mps.muted = val === 0;
}

const onChange = (val) => {
  mpv.goPlay(true);
  mps.paused = false;
}

const onInput = (val) => {
  console.log(val);
  mpv.goPlay(false);
  mpv.setTimePos(val);
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

const onMessage = (e) => {
  const msg = e.data;
  const {type, data} = msg;
  switch (data.name) {
    case 'time-pos':
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
  z-index: 9999;
}

.mpv-player-layout, #mpvjs {
  width: 100%;
  height: 100%;
}

.mpv-player-control {
  width: 100%;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.53);
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
</style>
