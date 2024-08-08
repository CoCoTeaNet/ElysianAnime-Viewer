<template>
  <div style="display: flex; align-items: center;">
    <el-input v-model="searchObj.searchKey" placeholder="搜索番剧~~~" @keydown.enter="onSearch">
      <template #prefix>
        <el-icon>
          <Search/>
        </el-icon>
      </template>
      <template #prepend>
        <el-select v-model="searchObj.readStatus" placeholder="进度" style="width: 80px">
          <el-option label="全部" value="-1"/>
          <el-option label="未看" value="未看"/>
          <el-option label="在看" value="在看"/>
          <el-option label="已看" value="已看"/>
        </el-select>
      </template>
      <template #append>
        <el-button @click="onSearch">搜索</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {Search} from "@element-plus/icons-vue";
import router from "@/router";

const searchObj = reactive({
  readStatus: "-1",
  searchKey: "",
});

const onSearch = () => {
  router.push({
    name: "AnimeHome",
    query: {
      searchKey: searchObj.searchKey ? searchObj.searchKey : "-1",
      readStatus: searchObj.readStatus,
    }
  });
}
</script>

<style scoped>

</style>