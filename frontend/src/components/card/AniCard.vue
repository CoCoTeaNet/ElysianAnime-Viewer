<template>
  <div class="ani-card-container">

    <div class="ani-card-cover"
         :style="`background-image: url(${cardView.cover})`"
    >
      <div class="ani-card-cover-text">
        <div></div>
        <el-text style="margin-right: 3px">
          {{cardView.currentEpisodes}} / {{cardView.episodes}}
        </el-text>
      </div>
    </div>

    <div style="text-align: left;margin-top: 3px">
      <div class="ani-card-title">
        <el-text type="primary" truncated>{{cardView.title}}</el-text>
        <el-icon style="transform: rotate(90deg);"><MoreFilled /></el-icon>
      </div>
      <el-text size="small">{{cardView.placeholder}}</el-text>
    </div>

  </div>
</template>

<script setup>
import {MoreFilled} from "@element-plus/icons-vue";
import {reactive} from "vue";

const props = defineProps(['cardData', 'coverBaseUrl']);

const cardView = reactive({
  title: props.cardData.nameCn,
  placeholder: props.cardData.launchStart,
  cover: props.coverBaseUrl + props.cardData.coverUrl,
  episodes: props.cardData.episodes,
  currentEpisodes: props.cardData.readingNum,
});

const toOpusDetail = () => {

}
</script>

<style scoped>
.ani-card-container {
  width: 10em;
  height: 15em;
  margin: 0 0.5em 1em 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.ani-card-cover {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #2c3e50;
  background-size: contain;
  border-radius: 4px;
}

.ani-card-cover-text {
  display: flex;
  justify-content: space-between;
}

.ani-card-title {
  display: flex;
  justify-content: space-between;
}
</style>