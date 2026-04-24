<script setup lang="ts">
import { computed, ref } from 'vue'
import { isTokenValid, removeToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'

const isClicked = ref<boolean>(false)

const isToken = ref<boolean>(isTokenValid())

const isLogin = computed(() => isToken.value)

const onCancel = (): void => {
  isClicked.value = true
}
const exit = (): void => {
  removeToken()
  isToken.value = false
  ElMessage.success('退出成功！')
}
</script>

<template>
  <nav class="nav-bar">
    <!-- 已登录 -->
    <ul v-if="isLogin" class="nav-list">
      <li><el-avatar :size="24" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"/></li>
      <li>
        <el-popconfirm width="150" title="您确定要退出吗?" @cancel="onCancel" @confirm="exit">
          <template #reference>
            <li class="nav-item">退出</li>
          </template>
          <template #actions="{ confirm, cancel }">
            <el-button size="small" @click="cancel">No!</el-button>
            <el-button type="primary" size="small" @click="confirm">Yes?</el-button>
          </template>
        </el-popconfirm>
      </li>
    </ul>
    <!-- 未登录 -->
    <ul v-else class="nav-list">
      <li class="nav-item"><RouterLink to="/account" class="to-where">登录</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-bar {
  background-color: #333;
  padding-right: 8%;
  height: 36px;
  display: flex;
  justify-content: flex-end;
}

.nav-list {
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
}

.nav-list :nth-child(2) {
  margin-left: 12px;
}

.nav-item {
  font-size: 12.6px;
  color: #e9dccd;
  transition: all 0.1s;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

.nav-item:hover {
  color: #db6f39;
}

.to-where {
  all: inherit;
  margin: 0;
  text-decoration: none;
}
</style>
