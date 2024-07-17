<template>
  <div class="ani-card-container">
    <div class="ani-card-cover">
      <img alt="cover" src=""/>
      <el-button class="ani-card-cover-btn" size="small" @click="toOpusDetail">追番</el-button>
    </div>
    <div>
      <el-text>为美好的世界献上祝福！</el-text>
      <el-text size="small" style="align-self: flex-start">2024-05-18</el-text>
    </div>
  </div>
</template>

<script setup>

const toOpusDetail = () => {

}
</script>

<style scoped>
.ani-card-container {
  background: #2c3e50;
  width: 10em;
  height: 15em;
  margin: 0 0.5em 1em 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.ani-card-cover {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: end;
  align-items: center;
}

.ani-card-cover img {
  width: 100%;
  height: 100%;
  background-color: #05a151;
}

.ani-card-cover-btn {
  position: absolute;
}
</style>