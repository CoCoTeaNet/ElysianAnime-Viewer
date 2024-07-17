<template>
  <div class="layout-aside-menu">
    <ani-aside-item :active="activeItemIndex === 1" @click="onSelected(1, 'AnimeHomeIndex')">
      <template #default>
        <home-filled/>
      </template>
      <template #text>首页</template>
    </ani-aside-item>

    <ani-aside-item :active="activeItemIndex === 2" @click="onSelected(2, 'AnimeHomeIndex')">
      <template #default>
        <share/>
      </template>
      <template #text>推荐</template>
    </ani-aside-item>

    <ani-aside-item :active="activeItemIndex === 3" @click="onSelected(3, 'AnimeHomeIndex')">
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
import {ref} from "vue";

const activeItemIndex = ref(1);

const onSelected = (val, viewName) => {
  activeItemIndex.value = val;
  router.push({name: viewName});
}

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
