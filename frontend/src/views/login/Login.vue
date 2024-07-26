<template>
  <div class="login-container">
    <div class="login-layout">

      <div class="login-box-right">
        <el-form class="login-box-form">
          <el-form-item>
            <h4 style="padding: 0;margin: 0;">LOGIN IN MY JANIME ~~~</h4>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="账号" :prefix-icon="User"/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="密码" :prefix-icon="Lock" type="password"/>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="验证码" :prefix-icon="Connection"/>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" style="width: 100%" type="primary" @click="doLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="login-box-left">

      </div>
    </div>
  </div>
</template>

<script setup>
import {User, Lock, Connection} from "@element-plus/icons-vue";
import {ref} from "vue";
import router from "@/router";

const loading = ref(false);

const doLogin = () => {
  loading.value = true;
  router.push({'name': 'AnimeHomeIndex'});
}
</script>

<style scoped src="./Login.css"></style>