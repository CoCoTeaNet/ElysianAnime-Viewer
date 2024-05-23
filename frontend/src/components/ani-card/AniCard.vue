<template>
  <div class="ani-card-container">
    <el-button @click="toOpusDetail">追番</el-button>
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

</style>