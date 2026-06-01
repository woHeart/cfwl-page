<template>
  <ApiFallBack :asyncFn="getRoleDetailed" :params="rolename">
    <template #loading>
      <div class="loading">
        <h1>加载中...</h1>
      </div>
    </template>
    <template #error="{retry}">
      <div class="error">
        <h1>请求失败...</h1>
        <button @click="retry">重试</button>
      </div>
    </template>
    <template #default="{data}">
      <div v-if="data">
        <Layout :roleDetailed="data" />
      </div>
    </template>
  </ApiFallBack>
</template>

<script setup lang="ts">
import Layout from './components/Layout.vue';
import ApiFallBack from '@/components/ApiFallBack.vue'
import { getRoleDetailed } from '@/apis/detailed';
import { useRoute } from 'vue-router';

const route = useRoute();
const rolename = route.query.name as string;
</script>

<style scoped lang="less">
.loading .error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
