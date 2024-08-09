<template>
  <div style="display: flex;flex-direction: column;">
    <el-descriptions
        title="用户信息"
        :column="3"
        border
    >
      <el-descriptions-item>
        <template #label>
          <el-space>
            <el-icon>
              <user/>
            </el-icon>
            账号
          </el-space>
        </template>
        {{ userinfo.username }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <el-space>
            <el-icon>
              <iphone/>
            </el-icon>
            昵称
          </el-space>
        </template>
        {{ userinfo.nickname }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <el-space>
            <el-icon>
              <message/>
            </el-icon>
            邮箱
          </el-space>
        </template>
        {{ userinfo.email ? userinfo.email : '...' }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div>
            <el-icon>
              <iphone/>
            </el-icon>
            手机号码
          </div>
        </template>
        {{ userinfo.mobilePhone ? userinfo.mobilePhone : '...' }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <el-space>
            <el-icon>
              <location/>
            </el-icon>
            最后登录时间
          </el-space>
        </template>
        {{userinfo.lastLoginTime}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <el-space>
            <el-icon>
              <location/>
            </el-icon>
            最后登录IP
          </el-space>
        </template>
        {{userinfo.lastLoginIp}}
      </el-descriptions-item>
    </el-descriptions>

    <el-button @click="onLogout" style="width: 120px;margin-top: 1em">退出登录</el-button>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import router from "@/router"
import sysLoginApi from "@/api/http/sys-login-api";
import sysUserApi from "@/api/http/sys-user-api";
import {ResultCode} from "@/utils/requestUtil";
import {Iphone, Location, Message, User} from "@element-plus/icons-vue";

const userinfo = ref({
  username: '',
  nickname: '',
  email: '',
  mobilePhone: '',
  lastLoginTime: '',
  lastLoginIp: '',
  roleList: [],
  sex: 0,
});

onMounted(() => {
  loadUserInfo();
});

const loadUserInfo = () => {
  sysUserApi.getDetail().then(resp => {
    let res = resp.data;
    console.log(res)
    if (res.code === ResultCode.SUCCESS) {
      userinfo.value = res.data;
    }
  });
}

const onLogout = () => {
  sysLoginApi.logout().finally(() => {
    router.push({name: 'LoginIndex'});
  });
}
</script>

<style scoped>

</style>