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
import {onMounted, reactive, ref, watch} from "vue";
import {ResultCode} from "@/utils/requestUtil";
import {useRoute} from "vue-router";
import {nextTick} from "vue";

const route = useRoute();

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
    windowName: 'AnimeVideo',
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


const onSearchKeyChange = (newVals, oldVals) => {
  let key = newVals[0];
  let status = newVals[1];

  if (key) {
    queryModel.searchKey = newVals[0];
  }
  if (status) {
    queryModel.status = [newVals[1]];
  }

  if ('-1' === key) {
    queryModel.searchKey = '';
  }

  if ('-1' === status) {
    queryModel.status = [];
  }

  if (key || status) {
    nextTick(() => loadOpus());
  }
}

watch(
    () => [route.query.searchKey, route.query.readStatus],
    onSearchKeyChange,
    {immediate: true},
);
</script>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
}
</style>