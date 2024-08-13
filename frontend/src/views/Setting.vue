<template>
  <el-form>

    <el-form-item label="服务器配置">

      <el-space>
        <el-input v-model="clientConf.server" placeholder="ps: http://localhost:8080"/>
        <el-button type="primary" @click="onUpdate">更新</el-button>
      </el-space>

    </el-form-item>

  </el-form>
</template>

<script setup>
import {reactive} from "vue";
import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";
import {ElNotification} from "element-plus";
import router from "@/router";
import {useUserStore} from "@/stores/user";

const store = useUserStore();

const clientConf = reactive({
  server: '',
});

const onUpdate = () => {
  if (clientConf.server) {
    let args = {
      key: "janime_api_url",
      value: clientConf.server
    };
    // 告诉服务器退出登录
    store.logout();
    // 更新配置项
    ipc.invoke(ipcApiRoute.cache, JSON.stringify(args)).then((resp) => {
      ElNotification({
        message: '更新成功！',
        type: 'success',
      });
      // 跳转登录界面
      router.push({name: 'LoginIndex'});
    });
  }
}
</script>

<style scoped>

</style>