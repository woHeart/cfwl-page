<template>
  <ApiFallBack :asyncFn="getRoleDetailed" :params="rolename">
    <template #loading>加载中...</template>
    <template #error="{error, retry}">
      加载失败: {{ error.message }}
      <button @click="retry">重试</button>
    </template>
    <template #default="{data}">
      <div v-if="data">
        <Layout :roledetailed="data" />
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
