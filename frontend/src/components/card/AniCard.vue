<template>
  <div class="ani-card-container">

    <div class="ani-card-cover pointer-css"
         :style="`background-image: url(${cardView.cover})`"
         @click="$emit('onTitleClick', cardData.id)"
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
        <el-text class="pointer-css"
                 type="primary"
                 truncated
                 @click="$emit('onTitleClick', cardData.id)">
          {{cardView.title}}
        </el-text>
        <el-icon style="transform: rotate(90deg);"><MoreFilled /></el-icon>
      </div>
      <el-text size="small"
               class="pointer-css"
               @click="$emit('onTitleClick', cardData.id)">
        {{cardView.placeholder}}
      </el-text>
    </div>

  </div>
</template>

<script setup>
import {MoreFilled} from "@element-plus/icons-vue";
import {reactive} from "vue";

const props = defineProps(['cardData', 'coverBaseUrl']);

const cardView = reactive({
  opusId: props.cardData.id,
  title: props.cardData.nameCn,
  placeholder: props.cardData.launchStart,
  cover: props.coverBaseUrl + props.cardData.coverUrl,
  episodes: props.cardData.episodes,
  currentEpisodes: props.cardData.readingNum,
});
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
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
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

.pointer-css {
  cursor: pointer;
}

.pointer-css:hover {
  font-weight: bold;
}

.ani-card-cover:hover {
  box-shadow: var(--el-box-shadow-dark);
}
</style>