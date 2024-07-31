<template>
  <media-controller class="mpv-player">
    <embed id="mpvjs" type="application/x-mpvjs"/>

    <media-control-bar>
      <media-play-button @click="onPlay"></media-play-button>
      <media-mute-button></media-mute-button>
      <media-volume-range></media-volume-range>
      <media-time-range></media-time-range>
      <media-pip-button></media-pip-button>
      <media-fullscreen-button></media-fullscreen-button>
    </media-control-bar>
  </media-controller>
</template>

<script setup>
import 'media-chrome';
import {nextTick, watch} from "vue";
import Mpv from "@/components/mpv-player/mpv";

const props = defineProps(['videoUrl']);

let mpv;

const playFile = (src) => {
  mpv.loadFile(src);
  mpv.goPlay(true);
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
.mpv-player, #mpvjs {
  width: 100%;
  height: 100%;
}
</style>
