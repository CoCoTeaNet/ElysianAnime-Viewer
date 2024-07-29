<template>
  <el-row class="video-container">

    <el-col :span="16"
            class="mpvjs-layout"
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
    </el-col>

    <el-col :span="8" class="video-right">
      <el-space direction="vertical" alignment="stretch">
        <el-card shadow="hover" style="text-align: left">
          <el-row>
            <el-col :span="16">
              <el-space direction="vertical">
                <el-text size="large" style="color: var(--el-color-primary)">{{ opusData.nameCn }}</el-text>
                <el-text size="small">
                  全 {{ opusData.episodes }} 话，看到 {{ opusData.readingNum }} 话
                </el-text>
              </el-space>
            </el-col>
            <el-col :span="8">
              <el-button>
                {{ opusData.userOpusId ? '已追番' : '未追番' }}
              </el-button>
            </el-col>
          </el-row>
          <el-divider content-position="left">简介</el-divider>
          <el-scrollbar style="height: 90px;text-align: left;">
            <div style="font-size: 12px;"
                 v-html="opusData.aniSummary"
            />
          </el-scrollbar>
        </el-card>

        <el-card style="max-height: 480px;text-align: left" shadow="hover">
          <template #header>
            <el-text>
              选集 {{ opusData.readingNum }} / {{ formatUtil.fillZero(opusData.mediaList.length) }}
            </el-text>
          </template>
          <el-radio-group v-model="opusData.readingNum">
            <el-radio-button
                v-for="media in opusData.mediaList"
                :label="media.episodes"
                :value="media.episodes"
            />
          </el-radio-group>
        </el-card>

        <el-card style="text-align: left;font-size: 14px" shadow="hover">
          <p>RSS链接: {{opusData.rssUrl}}</p>
          <p>番组计划: https://bgm.tv{{opusData.detailInfoUrl}}</p>
          <p>放送日期: {{opusData.launchStart}}</p>
          <p>放送星期: {{opusData.deliveryWeek}}</p>
          <p>
            番剧标签: <el-tag v-for="tag in opusData.aniTags">{{tag.tagName}}</el-tag>
          </p>
        </el-card>
      </el-space>
    </el-col>
  </el-row>
</template>

<script setup>
import Mpv from "@/views/anime/video/mpv";
import {onMounted, ref, nextTick, watch,} from "vue";
import {FullScreen, Microphone, Mute, Setting, VideoPause, VideoPlay} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import aniOpusApi from "@/api/http/ani-opus-api";
import {ResultCode} from "@/utils/requestUtil";
import formatUtil from "../../../utils/formatUtil";

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

const opusData = ref({
  id: '',
  nameCn: '',
  nameOriginal: '',
  coverUrl: '',
  episodes: '',
  detailInfoUrl: '',
  userOpusId: '',
  readStatus: 0,
  readingNum: 0,
  readingTime: 0,
  mediaList: '',
  rssUrl: '',
  launchStart: '',
  isShare: 0,
  isFollow: 0,
  deliveryWeek: '',
  aniTags: [],
  aniSummary: '',
});

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

const loadMediaData = (opusId) => {
  aniOpusApi.getOpusMedia(opusId).then(resp => {
    let res = resp.data;
    if (res.code === ResultCode.SUCCESS) {
      if (res.data.readingNum) {
        res.data.readingNum = formatUtil.fillZero(res.data.readingNum);
      }
      opusData.value = res.data;
    }
  });
}

const onOpusIdChange = (opusId) => {
  loadMediaData(opusId);
}

watch(() => route.query.opusId, onOpusIdChange, {immediate: true});
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

.video-right {
  height: 100%;
  overflow: auto;
  padding: 1em 1em 0 1em;
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
