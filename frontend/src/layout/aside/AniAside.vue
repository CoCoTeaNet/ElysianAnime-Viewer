<template>
  <div class="layout-aside-menu">
    <ani-aside-item>
      <template #default>
        <home-filled/>
      </template>
      <template #text>首页</template>
    </ani-aside-item>

    <ani-aside-item>
      <template #default>
        <share/>
      </template>
      <template #text>推荐</template>
    </ani-aside-item>

    <ani-aside-item>
      <template #default>
        <star-filled/>
      </template>
      <template #text>收藏</template>
    </ani-aside-item>

    <div class="flex-grow"></div>

    <div style="margin-bottom: 0.5em" @click="loginInfo()">
      <el-avatar size="small" :src="userAvatar ? userAvatar : ''"></el-avatar>
    </div>

    <ani-aside-item>
      <template #default>
        <message/>
      </template>
    </ani-aside-item>

    <ani-aside-item>
      <template #default>
        <setting/>
      </template>
    </ani-aside-item>
  </div>
</template>

<script setup>
import {HomeFilled, Message, Setting, Share, StarFilled} from "@element-plus/icons-vue";
import userAvatar from "@/assets/svg-source/default-avatar.svg";
import AniAsideItem from "@/layout/aside/child/AniAsideItem.vue";
import router from "@/router";

const loginInfo = () => {
  console.log('login')
  router.push({'name': 'LoginIndex'});
}
</script>

<style scoped>
.layout-aside-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: whitesmoke;
}

.flex-grow {
  flex-grow: 1;
}
</style>
