<script setup lang="ts">
import { computed, ref } from 'vue';
import Login from './Login.vue';
import Enroll from './Enroll.vue';

const whichForm = ref<0 | 1>(0)
const drawer = ref<boolean>(false)

const formTitle = computed(() => whichForm.value === 0 ? '账号登录' : '账号注册')
const currentComponent = computed(() => whichForm.value === 0 ? Login : Enroll);

const changeForm = (): void => {
  if (whichForm.value === 0) return
  whichForm.value = 0
}

const toEnroll = (): void => {
  whichForm.value = 1
}

const toLogin = (): void => {
  whichForm.value = 0
}

const openDrawer = (): void => {
  drawer.value = true
}
</script>

<template>
  <div class="bg">
    <el-card class="card" header-class="my-header-class" body-class="my-body-class">
      <template #header>
        <div class="back" @click="changeForm">
          <el-icon style="font-size: 16px">
            <IEpArrowLeft />
          </el-icon>
          <span>Back</span>
        </div>
      </template>
      <div class="form-name">{{ formTitle }}</div>
      <component :is="currentComponent" @change="toEnroll" @success="toLogin" @protocol="openDrawer" />
    </el-card>
    <!-- 注册的同意用户协议 -->
    <el-drawer header-class="drawer-header" v-model="drawer" title="用户协议">
      <span>Look at my eyes!!!</span>
    </el-drawer>
  </div>
</template>

<style scoped>
.bg {
  position: relative;
  background-image: url(/src/assets/Other/暴雨前夕.webp);
  background-size: cover;
  min-height: 100vh;
}

.card {
  position: absolute;
  width: 450px;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
}

:deep(.my-header-class) {
  padding: 15px 20px;
}

:deep(.my-body-class) {
  width: 70%;
  padding-top: 10px;
  margin: 0 auto
}

.back {
  opacity: 0.8;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
}

.back:hover {
  opacity: 1;
  color: #409eff;
}

.back span {
  font-size: 16px;
  padding-left: 4px;
}

.form-name {
  width: fit-content;
  margin: 5px auto 20px;
  font-size: 28px;
  font-weight: 600;
  color: #409EFF;
  letter-spacing: 0.5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

:deep(.el-drawer__title) {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 0.5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

:deep(.drawer-header) {
  margin-bottom: 0;
}
</style>
