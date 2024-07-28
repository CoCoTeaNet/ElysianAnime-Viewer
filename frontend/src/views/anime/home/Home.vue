<template>
  <div class="home-container">
    <ani-card
        v-for="opus in opusPage.records"
        :card-data="opus"
        :cover-base-url="coverApiBase"
        @onTitleClick="toOpusDetail"
    />
  </div>
</template>

<script setup>
import {ipcApiRoute} from "@/api/main";
import {ipc} from "@/utils/ipcRenderer";
import AniCard from "@/components/card/AniCard.vue";
import aniOpusApi from "@/api/http/ani-opus-api";
import {onMounted, reactive, ref} from "vue";
import {ResultCode} from "@/utils/requestUtil";

const coverApiBase = ref('');
const queryModel = reactive({
  pageNo: 1,
  pageSize: 40,
  hasResource: 1,
  searchKey: "",
  states: [],
  years: [],
  months: [],
  status: [],
});
const opusPage = reactive({
  records: [],
  total: 0
});

onMounted(() => {
  ipc.invoke(ipcApiRoute.getCache, 'janime_api_url').then(baseUrl => {
    coverApiBase.value = baseUrl + '/api/anime/opus/cover?resName=';
    loadOpus();
  });
});

const toOpusDetail = (opusId) => {
  let args = {
    type: 'vue',
    content: '/video',
    windowName: 'AnimeVideoIndex',
    windowTitle: 'mpv-player',
    opusId: opusId
  };
  ipc.invoke(ipcApiRoute.createMpv, args).then(id => {
    console.log('[createWindow] id:', id);
  });
  console.log(opusId)
}

const loadOpus = () => {
  let queryParams = {};

  Object.assign(queryParams, queryModel);

  aniOpusApi.listByUser(queryParams).then(resp => {
    let vo = resp.data;
    if (vo.code === ResultCode.SUCCESS) {
      opusPage.total = vo.data.total;
      opusPage.records = vo.data.records;
    }
  });
}
</script>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
}
</style>