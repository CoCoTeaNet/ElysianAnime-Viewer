<template>
  <el-menu :collapse="true" :ellipsis="false" class="layout-aside-menu" popper-effect="dark">
    <el-menu-item index="1">
      <el-icon :size="iconSize">
        <home-filled/>
      </el-icon>
      <template #title>首页</template>
    </el-menu-item>

    <el-menu-item index="2">
      <el-icon :size="iconSize">
        <share/>
      </el-icon>
      <template #title>推荐栏目</template>
    </el-menu-item>

    <el-menu-item index="3">
      <el-icon :size="iconSize">
        <star/>
      </el-icon>
      <template #title>我的追番</template>
    </el-menu-item>

    <el-menu-item index="4">
      <el-avatar size="small" :src="userAvatar ? userAvatar : ''"></el-avatar>
      <template #title>我的信息</template>
    </el-menu-item>

    <el-menu-item index="5">
      <el-icon :size="iconSize">
        <message/>
      </el-icon>
      <template #title>通知消息</template>
    </el-menu-item>

    <el-menu-item index="6">
      <el-icon :size="iconSize">
        <setting/>
      </el-icon>
      <template #title>设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {HomeFilled, Message, Setting, Share, Star} from "@element-plus/icons-vue";
import userAvatar from "@/assets/svg-source/default-avatar.svg";

const iconSize = 24;
</script>

<style scoped>
.layout-aside-menu {
  justify-content: space-between;
}

.flex-grow {
  flex-grow: 1;
}
</style>