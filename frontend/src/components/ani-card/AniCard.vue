<template>
  <div class="ani-card-container">

    <div class="ani-card-cover">
      <div class="ani-card-cover-text">
        <div></div>
        <el-text>01 / 12</el-text>
      </div>
    </div>

    <div style="text-align: left;margin-top: 3px">
      <div class="ani-card-title">
        <el-text truncated>为美好的世界献上祝福！</el-text>
        <el-icon style="transform: rotate(90deg);"><MoreFilled /></el-icon>
      </div>
      <el-text size="small">2024-05-18</el-text>
    </div>

  </div>
</template>

<script setup>
import {MoreFilled} from "@element-plus/icons-vue";

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