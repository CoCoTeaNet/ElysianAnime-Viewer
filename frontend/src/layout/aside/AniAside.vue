<template>
  <el-menu class="new-el-menu--sidebar" collapse default-active="1">
    <div class="menu-logo">
      <img src="@/assets/logo.png" style="width: 36px" alt="logo">
    </div>

    <el-menu-item index="1">
      <el-icon>
        <home-filled/>
      </el-icon>
    </el-menu-item>

    <el-menu-item index="2">
      <el-icon>
        <star-filled/>
      </el-icon>
    </el-menu-item>

    <el-menu-item index="3">
      <el-icon>
        <share/>
      </el-icon>
    </el-menu-item>

    <el-menu-item index="4">
      <el-icon>
        <message/>
      </el-icon>
    </el-menu-item>

    <el-menu-item index="5">
      <el-icon>
        <setting/>
      </el-icon>
    </el-menu-item>

  </el-menu>
</template>

<script setup>
import {HomeFilled, Message, Setting, Share, StarFilled} from "@element-plus/icons-vue";
</script>

<style scoped>
.menu-logo {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 1em 0 0.5em 0;
}

/* 自定义菜单激活状态样式 */
.el-menu-item.is-active {
  color: var(--el-menu-hover-text-color);
  background-color: var(--el-menu-hover-bg-color);
}

/* 菜单的背景颜色透明 */
.el-menu {
  background-color: rgba(0, 0, 0, 0);
}
</style>
