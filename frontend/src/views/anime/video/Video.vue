<template>
  <el-row class="video-container">

    <el-col :span="16">
      <mpv-player ref="mpvRef" :video-url="videoFullUrl"/>
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
              <el-button :type="opusData.userOpusId ? 'primary' : ''"
                         :disabled="!!opusData.userOpusId"
                         @click="onFollow">
                <template #icon>
                  <el-icon>
                    <star-filled v-if="opusData.userOpusId"/>
                    <star v-else/>
                  </el-icon>
                </template>
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
              选集 {{ readingNum }} / {{ formatUtil.fillZero(opusData.mediaList.length) }}
            </el-text>
          </template>
          <el-radio-group v-model="readingNum" @change="onEpisodesChange">
            <el-radio-button
                v-for="media in opusData.mediaList"
                :label="media.episodes"
                :value="media.episodes"
            />
          </el-radio-group>
        </el-card>

        <el-card style="text-align: left;font-size: 14px" shadow="hover">
          <p>
            观看状态：
            <el-switch
                inline-prompt
                inactive-text="Reading~"
                active-text="~Complete"
                :active-value="1"
                :inactive-value="0"
                v-model="opusData.readStatus"
                @change="onReadStatusChange"
            />
          </p>
          <p>推荐番剧:
            <el-switch
                inline-prompt
                inactive-text="(ˇˍˇ) 想～"
                active-text="o(￣▽￣)ｄ"
                :active-value="1"
                :inactive-value="0"
                v-model="opusData.isShare"
                @change="onShareChange"
            />
          </p>
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
import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";
import {Star, StarFilled} from "@element-plus/icons-vue";
import aniUserOpusApi from "@/api/http/ani-user-opus";
import {ElNotification} from "element-plus";

const route = useRoute();

const mpvRef = ref(null);
const baseApiUrl = ref('');
const coverFullUrl = ref('');
const videoFullUrl = ref('');
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
const readingNum = ref('');

onMounted(() => {
  ipc.invoke(ipcApiRoute.getCache, 'janime_api_url').then(baseUrl => {
    coverFullUrl.value = baseUrl + '/api/anime/opus/cover?resName=';
    baseApiUrl.value = baseUrl;
  });

  setInterval(() => {
    if (!mpvRef.value.getPaused() && opusData.value.userOpusId > 0) {
      let param = {
        readingTime: mpvRef.value.getTime(),
        id: opusData.value.userOpusId,
      };
      aniUserOpusApi.updateProgress(param);
    }
  }, 2500);
});

const loadMediaData = (opusId) => {
  aniOpusApi.getOpusMedia(opusId).then(resp => {
    let res = resp.data;
    if (res.code !== ResultCode.SUCCESS) {
      return res;
    }
    if (!res.data.readingNum) {
      return res;
    }

    autoPlay(opusId, res.data);

    readingNum.value = formatUtil.fillZero(res.data.readingNum);
    opusData.value = res.data;
  });
}

const autoPlay = (opusId, data) => {
  let media;
  if (data.readingNum <= 0) {
    media = data.mediaList[0];
  } else {
    media = data.mediaList[data.readingNum - 1];
  }
  videoFullUrl.value = getMediaUrl(opusId, media.episodes, media.mediaType);

  if (data.readingTime) {
    mpvRef.value.setTimePos(data.readingTime);
    console.log('auto time pos', data.readingTime);
  }

  console.log('src=' + videoFullUrl.value)
}

const getMediaUrl = (id, episodes, mediaType) => {
  return `${baseApiUrl.value}/api/anime/opus/media/${id}?resName=${episodes}.${mediaType}`;
}

const onEpisodesChange = (val) => {
  let mediaType = opusData.value.mediaList[0].mediaType;
  videoFullUrl.value = getMediaUrl(route.query.opusId, val, mediaType);
}

const onFollow = () => {
  let opusId = route.query.opusId;
  aniUserOpusApi.follow(opusId).then(resp => {
    let res = resp.data;
    if (res.code === ResultCode.SUCCESS) {
      loadMediaData(opusId);
    }
  });
}

const onShareChange = (val) => {
  if (opusData.value.userOpusId <= 0) {
    ElNotification({
      message: '在推荐番剧前先追番吧~~~',
      type: 'warning',
    });
    opusData.value.isShare = 0;
    return;
  }
  aniUserOpusApi.share(route.query.opusId);
}

const onReadStatusChange = (val) => {
  if (val === 1) {
    let param = {
      readStatus: val,
      id: opusData.value.userOpusId,
    };
    aniUserOpusApi.updateProgress(param);
  }
}

const onOpusIdChange = (opusId) => {
  loadMediaData(opusId);
}

watch(() => route.query.opusId, onOpusIdChange, {immediate: true});
</script>

<style scoped>
.video-container {
  height: 100%;
  padding: 5px;
}

.video-right {
  height: 100%;
  overflow: auto;
  padding: 1em 1em 0 1em;
}
</style>
