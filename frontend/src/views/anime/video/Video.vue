<template>
  <el-row class="video-container">

    <el-col :span="16" class="mpvjs-layout">
      <mpv-player/>
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
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import aniOpusApi from "@/api/http/ani-opus-api";
import {ResultCode} from "@/utils/requestUtil";
import formatUtil from "@/utils/formatUtil";
import MpvPlayer from "@/components/mpv-player/MpvPlayer.vue";

const route = useRoute();

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
.video-container {
  height: 100%;
}

.mpvjs-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
}

.video-right {
  height: 100%;
  overflow: auto;
  padding: 1em 1em 0 1em;
}
</style>
