<template>
  <el-container style="height: 100vh">
    <el-aside width="63px"><ani-aside/></el-aside>

    <el-container>
      <el-header><ani-header/></el-header>

      <el-main>
        <router-view v-slot="{Component}">
          <keep-alive>
            <transition :name="`slide-fade`" :mode="`out-in`">
              <component :is="Component"/>
            </transition>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>

import AniHeader from "@/layout/header/AniHeader.vue";
import AniAside from "@/layout/aside/AniAside.vue";
</script>

<!--私有样式-->
<style scoped>
.el-aside {
  overflow-x: hidden;
  transition: width 200ms;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .6s ease;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(0.42, 0, 0.58, 1);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>