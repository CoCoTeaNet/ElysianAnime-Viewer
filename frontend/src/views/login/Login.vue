<template>
  <div class="login-container">
    <div class="login-layout">

      <div class="login-box-right">
        <el-form ref="loginFormRef" class="login-box-form" :model="loginForm" :rules="rules">
          <el-form-item>
            <h4 style="padding: 0;margin: 0;">LOGIN IN MY ElysianAnime ~~~</h4>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" show-word-limit placeholder="账号" :prefix-icon="User"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password"
                      show-word-limit
                      placeholder="密码"
                      :prefix-icon="Lock"
                      type="password"
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row gutter="8" align="middle">
              <el-col :span='16'>
                <el-input v-model="loginForm.captcha"
                          show-word-limit
                          placeholder="验证码"
                          :prefix-icon="Connection"
                          @keydown.enter="doLogin(loginFormRef)"
                />
              </el-col>
              <el-col :span='8'>
                <el-image @click="loadCaptcha" style="cursor: pointer" :src="captchaBase64"/>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" style="width: 100%" type="primary" @click="doLogin(loginFormRef)">
              登录
            </el-button>
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
import {ref, reactive, onMounted} from "vue";
import router from "@/router";
import sysLoginApi from "@/api/http/sys-login-api";
import {ipcApiRoute} from "@/api/main";
import {ipc} from "@/utils/ipcRenderer";
import {getSm2} from "@/utils/smUtil";
import {ResultCode} from "@/utils/requestUtil";
import {useUserStore} from "@/stores/user";
import Toast from "@/components/global/toast";

const store = useUserStore();
const sm2 = getSm2();

const loginFormRef = ref();
const loading = ref(false);
const loginForm = reactive({
  username: '',
  password: '',
  captcha: '',
  captchaId: '', // 验证码ID
  publicKey: [], // 公钥
  rememberMe: true
});
// 验证码
const captchaBase64 = ref('');

onMounted(() => {
  ipc.invoke(ipcApiRoute.test, '').then(id => {
    console.log('[test] id:', id);
  });
  loadCaptcha();
});

const loadCaptcha = () => {
  let timestamp = new Date().getTime();
  sysLoginApi.captcha(timestamp).then(res => {
    let data = res.data.data;
    captchaBase64.value = `data:image/jpeg;base64,${data.imgBase64}`;
    loginForm.captchaId = data.captchaId;
    loginForm.publicKey = data.publicKey;
  });
}

const rules = reactive({
  username: [
    {required: true, message: 'Please input Activity username', trigger: 'blur'},
    {min: 4, max: 40, message: 'Length should be 4 to 40', trigger: 'blur'},
  ],
  password: [
    {required: true, message: 'Please input Activity password', trigger: 'blur'},
    {min: 6, max: 40, message: 'Length should be 6 to 40', trigger: 'blur'},
  ],
  captcha: [
    {required: true, message: 'Please input Activity captcha', trigger: 'blur'},
    {min: 4, max: 6, message: 'Length should be 4 to 6', trigger: 'blur'},
  ]
});

const doLogin = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      // see https://github.com/JuneAndGreen/sm-crypto/issues/72
      let encPassword = '04' + sm2.doEncrypt(loginForm.password, loginForm.publicKey);
      let loginParams = {password: ''};
      Object.assign(loginParams, loginForm);
      loginParams.password = encPassword;

      sysLoginApi.login(loginParams).then(res => {
        let data = res.data;
        if (data.code === ResultCode.SUCCESS) {
          Toast.success('登录成功');
          store.saveToken(data.data);
          setTimeout(() => {
            router.push({name: 'AnimeHome'});
          }, 1000);
        } else {
          Toast.error(data.message);
          loadCaptcha();
        }
        loading.value = false;
      }).catch(err => {
        console.log(err);
        Toast.error('网络连接错误');
        loading.value = false;
      });
    } else {
      console.log('error submit!', fields);
      Toast.warning('您的输入不合法，请检查！');
    }
  });
}
</script>

<style scoped src="./Login.css"></style>
