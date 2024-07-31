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
import {nextTick} from "vue";
import Mpv from "@/components/mpv-player/mpv";

const url = '';
let mpv;

nextTick(() => {
  mpv = new Mpv(document.getElementById("mpvjs"));
  setTimeout(() => {
    mpv.loadFile(url);
  }, 1000);
});

const onPlay = () => {
  console.log('play');
  mpv.goPlay(true)
}
</script>

<style scoped>
.mpv-player, #mpvjs {
  width: 100%;
  height: 100%;
}
</style>
