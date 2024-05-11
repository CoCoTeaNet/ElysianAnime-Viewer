<template>
  <div class="layout-aside-menu-item">
    <el-icon :size="iconSize" :color="iconColor">
      <slot name="default"></slot>
    </el-icon>
  </div>
</template>

<script setup>
import {ref} from "vue";

const iconSize = 24;
const iconColor = ref('white');
</script>

<style scoped>
.layout-aside-menu-item:hover {

}
</style>
