<template>
  <ErrorBoundary>
    <ApiFallBack :asyncFn="getRoleDetailed" :params="rolename">
      <template #loading>
        <div class="load-card">
          <h1>加载中...</h1>
        </div>
      </template>
      <template #error="{ retry }">
        <div class="error-card">
          <h1>请求失败, 请重试</h1>
          <el-button type="primary" round @click="retry">重试</el-button>
        </div>
      </template>
      <template #default="{ data }">
        <div v-if="data">
          <Layout :roleDetailed="data" />
        </div>
      </template>
    </ApiFallBack>
  </ErrorBoundary>
</template>

<script setup lang="ts">
import ErrorBoundary from '@/components/ErrorBoundary.vue';
import Layout from './components/Layout.vue';
import ApiFallBack from '@/components/ApiFallBack.vue'
import { getRoleDetailed } from '@/apis/detailed';
import { useRoute } from 'vue-router';

const route = useRoute();
const rolename = route.query.name as string;
</script>

<style scoped>
.load-card,
.error-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 160px;
}

h1 {
  font-family: '宋体';
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
