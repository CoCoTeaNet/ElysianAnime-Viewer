<template>
  <div>
    <el-input v-model="searchStr" placeholder="搜索番剧~~~">
      <template #prefix>
        <el-icon>
          <Search/>
        </el-icon>
      </template>
      <template #append>
        <el-select v-model="select" placeholder="进度" style="width: 80px">
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