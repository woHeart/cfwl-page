<script setup lang="ts">
import type { RoleBaseDicDDD } from '@/types';

const { RoleBaseDic } = defineProps<{
  RoleBaseDic: RoleBaseDicDDD;
}>()
</script>

<template>
  <div class="all-info">
    <div class="item-info" v-for="(value, key, index) in RoleBaseDic" :key="index">
      <div class="info-key">
        <div class="out-circle">
          <div class="in-circle"></div>
        </div>
        <p class="key">{{ key }}</p>
      </div>
      <div class="info-value">{{ value }}</div>
    </div>
  </div>
</template>

<style scoped>
.all-info {
  margin: 30px 0 0 56px;
}

.item-info {
  margin-bottom: 15px;
}

.info-key {
  display: flex;
  margin-bottom: 8px;
}

.out-circle {
  padding: 3px;
  margin-right: 6px;
  border-radius: 50%;
  border: 1.5px solid #c56032;
}

.in-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #c56032;
}

.key {
  font-family: '宋体';
  font-size: 16px;
  font-weight: bold;
}

.info-value {
  font-size: 16px;
  line-height: 22px;
  width: 85%;
}
</style>
