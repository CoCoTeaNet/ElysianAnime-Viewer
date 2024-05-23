<template>
  <div style="display: flex; justify-content: right">
    <el-input v-model="searchStr" placeholder="番剧搜索~~~" style="max-width: 32em">
      <template #append>
        <el-button :icon="Search"/>
      </template>
      <template #prepend>
        <el-select v-model="select" placeholder="追番状态" style="width: 101px">
          <el-option label="未看" value="1"/>
          <el-option label="在看" value="2"/>
          <el-option label="已看" value="3"/>
        </el-select>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {Search} from "@element-plus/icons-vue";

const select = ref('');
const searchStr = ref('');
</script>

<style scoped>

</style>