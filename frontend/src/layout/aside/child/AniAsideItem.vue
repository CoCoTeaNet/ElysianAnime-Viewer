<template>
  <el-space direction="vertical"
            :size="2"
            class="layout-aside-menu-item"
            @mouseenter="onMouseenter"
            @mouseleave="onMouseleave">
    <el-icon :size="iconSize" :color="iconColor">
      <slot name="default"></slot>
    </el-icon>
    <el-text :style="`color:${iconColor}`"
             size="small" tag="b">
      <slot name="text"></slot>
    </el-text>
  </el-space>
</template>

<script setup>
import {ref} from "vue";

const defaultColor = '#303133';
const iconSize = 24;
const iconColor = ref(defaultColor);

const onMouseenter = () => {
  iconColor.value = '#d40046';
}

const onMouseleave = () => {
  iconColor.value = defaultColor;
}

</script>

<style scoped>
.layout-aside-menu-item {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.layout-aside-menu-item:hover {
  cursor: pointer;
}
</style>
