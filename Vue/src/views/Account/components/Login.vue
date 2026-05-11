<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuth } from './useAuth'
import { type FormInstance, type FormRules, type FormItemRule } from 'element-plus';

const { formData, loginVerify } = useAuth()
const loginFormRef = ref<FormInstance | null>(null)

const emit = defineEmits<{
  'change': []
}>();

const changeForm = (): void => {
  emit('change')
}

const checkAccount:  FormItemRule['validator'] = (rule, value, callback) => {
  if (value.includes(' ')) {
    callback(new Error('赶紧给劳资去掉空格！！！'))
  } else if (value.length < 6 || value.length > 12) {
    callback(new Error('账号？？？'))
  }
  callback()
}
const checkPassword:  FormItemRule['validator'] = (rule, value, callback) => {
  if (value.includes(' ')) {
    callback(new Error('赶紧给劳资去掉空格！！！'))
  } else if (value.length < 8 || value.length > 15) {
    callback(new Error('密码？？？'))
  }
  callback()
}

const rules = reactive<FormRules<typeof formData>>({
  account: [{ validator: checkAccount, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }]
})

</script>

<template>
  <el-form ref="loginFormRef" label-width="auto" :model="formData" :rules="rules">
    <el-form-item style="margin-bottom: 20px;" prop="account">
      <el-input style="height: 42px;" v-model="formData.account" placeholder="输入账号" clearable />
    </el-form-item>
    <el-form-item style="margin-bottom: 8px;" prop="password">
      <el-input style="height: 42px;" v-model="formData.password" placeholder="密码" show-password />
    </el-form-item>
    <div class="to-register" @click="changeForm">
      <span>免费注册</span>
    </div>
    <el-form-item>
      <el-button class="login-button" round @click="loginVerify(loginFormRef)">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.to-register {
  display: flex;
  justify-content: end;
  cursor: pointer;
  opacity: 0.65;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin-bottom: 20px;
}

.to-register:hover {
  opacity: 1;
  color: #409eff;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
}
</style>
