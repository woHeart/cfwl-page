<script setup lang="ts">
import { ref, reactive } from 'vue'
import { accountEnroll } from '@/apis/accout'
import { EnrollFormData } from '@/types';
import { ElMessage, type FormInstance, type FormRules, type FormItemRule  } from 'element-plus';

const EnrollFormRef = ref<FormInstance | null>(null)
const checkAgree = ref<boolean>(false)

const formData: EnrollFormData = reactive({
  account: '',
  password: '',
  confirmPassword: ''
})

const emit = defineEmits<{
  'success': []
  'protocol': []
}>();

const enrollSuccess = (): void => {
  emit('success')
}
const openDrawer = (): void => {
  emit('protocol')
}

const checkAccount: FormItemRule['validator'] = (rule, value, callback) => {
  if (value.includes(' ')) {
    callback(new Error('赶紧给劳资去掉空格！！！'))
  } else if (value.length < 6 || value.length > 12) {
    callback(new Error('账号？？？'))
  }
  callback()
}
const checkPassword: FormItemRule['validator'] = (rule, value, callback) => {
  if (value.includes(' ')) {
    callback(new Error('赶紧给劳资去掉空格！！！'))
  } else if (value.length < 8 || value.length > 15) {
    callback(new Error('密码？？？'))
  }
  callback()
}
const checkConfirmPassword: FormItemRule['validator'] = (rule, value, callback) => {
  if (value.includes(' ')) {
    callback(new Error('赶紧给劳资去掉空格！！！'))
  } else if (value.length < 8 || value.length > 15) {
    callback(new Error('密码？？？'))
  } else if (formData.confirmPassword != formData.password) {
    callback(new Error('回炉重造吧'))
  }
  callback()
}

const rules = reactive<FormRules<typeof formData>>({
  account: [{ validator: checkAccount, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }],
  confirmPassword: [{ validator: checkConfirmPassword, trigger: 'blur' }]
})

const EnrollVerify = async (ref: FormInstance | null): Promise<void> => {
  if (!checkAgree.value) {
    ElMessage.warning('您未同意用户协议');
    return
  }
  try {
    await ref?.validate();
    await accountEnroll(formData);
    ElMessage.success('注册成功');
    enrollSuccess();
  } catch {
    console.error("注册失败")
  }
}
</script>

<template>
  <el-form ref="EnrollFormRef" label-width="auto" :model="formData" :rules="rules">
    <el-form-item style="margin-bottom: 20px;" prop="account">
      <el-input style="height: 42px;" v-model="formData.account" placeholder="输入6~12位账号" clearable />
    </el-form-item>
    <el-form-item style="margin-bottom: 20px;" prop="password">
      <el-input style="height: 42px;" v-model="formData.password" placeholder="输入8~15位密码" show-password />
    </el-form-item>
    <el-form-item style="margin-bottom: 28px;" prop="confirmPassword">
      <el-input style="height: 42px;" v-model="formData.confirmPassword" placeholder="确认您的密码" show-password />
    </el-form-item>
    <el-form-item>
      <el-button class="enroll-button" round @click="EnrollVerify(EnrollFormRef)">注册</el-button>
    </el-form-item>
    <ul class="agree">
      <li><el-checkbox v-model="checkAgree" /></li>
      <li @click="openDrawer"><span>我已阅读并同意<p>《用户协议》</p></span></li>
    </ul>
  </el-form>
</template>

<style scoped>
.enroll-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
}

.agree {
  display: flex;
  align-items: center;
}

.agree li span {
  display: flex;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
}

p {
  color: #409eff;
}
</style>
