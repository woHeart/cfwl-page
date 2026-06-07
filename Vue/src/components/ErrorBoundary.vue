<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err, instance, info) => {
  console.error(`错误边界捕获到异常: ${info}, 错误信息: ${err}`)
  error.value = err
  return false
})

const clearError = () => {
  error.value = null
}
</script>

<template>
  <slot v-if="!error" name="default"></slot>
  <div class="error-boundary-card" v-else>
    <h1>页面错误, 请重试</h1>
    <el-button type="primary" round @click="clearError">重试</el-button>
  </div>
</template>

<style scoped>
.error-boundary-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 160px;
}

h1 {
  font-family: '宋体';
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
