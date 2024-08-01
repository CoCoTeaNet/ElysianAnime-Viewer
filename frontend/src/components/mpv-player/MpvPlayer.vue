<template>
  <div class="mpv-player-layout">
    <embed id="mpvjs" type="application/x-mpvjs"/>

    <div class="mpv-player-control">

      <div class="mpc-left">
        <div class="mp-play" @click="onpause">
          <icon-play v-if="mps.paused"/>
          <icon-paused v-else/>
        </div>
        <div class="micro-box">
          <div class="mp-muted">
            <icon-volume/>
          </div>
          <div style="width: 100px">
            <el-slider size="small" v-model="mps.volume" :max="100" />
          </div>
        </div>
      </div>

      <div style="width: 100%;padding: 0 1em 0 1em">
        <el-slider size="small" />
      </div>

<!--      <div>-->
<!--        <icon-setting/>-->
<!--      </div>-->

      <div class="mp-screen" @click="onFullscreen">
        <icon-screen/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, nextTick, watch, reactive} from "vue";
import Mpv from "@/components/mpv-player/mpv";
import IconPlay from "@/components/icon/IconPlay.vue";
import IconPaused from "@/components/icon/IconPaused.vue";
import IconScreen from "@/components/icon/IconScreen.vue";
import IconVolume from "@/components/icon/IconVolume.vue";
import IconSetting from "@/components/icon/IconSetting.vue";

const props = defineProps(['videoUrl']);

let mpv;

const mps = reactive({
  volume: 50,
  paused: true,
});

onMounted(() => {
});

const playFile = (src) => {
  mpv.loadFile(src);
  mpv.goPlay(true);
  mps.paused = false;
}

const onpause = () => {
  console.log(mps.paused)
  if (mps.paused === true) {
    // 暂停了，那就播放
    mpv.goPlay(true);
  } else {
    // 暂停
    mpv.goPlay(false);
  }
  mps.paused = !mps.paused;
}

const onFullscreen = () => {
}

const onVideoSrcChange = (newVal) => {
  if (mpv) {
    playFile(newVal);
    return;
  }
  nextTick(() => {
    mpv = new Mpv(document.getElementById("mpvjs"));
    playFile(newVal);
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
