<template>
  <el-space direction="vertical"
            :size="2"
            class="layout-aside-menu-item"
            @mouseleave="onMouseleave">
    <el-icon :size="iconSize" :color="props.active ? activeColor : defaultColor">
      <slot name="default"></slot>
    </el-icon>
    <el-text :style="`color:${props.active ? activeColor : defaultColor}`"
             size="small" tag="b">
      <slot name="text"></slot>
    </el-text>
  </el-space>
</template>

<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  active: {type: Boolean, default: false},
});

const defaultColor = '#303133';
const activeColor = '#d40046';
const iconSize = 24;
const iconColor = ref(defaultColor);

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
