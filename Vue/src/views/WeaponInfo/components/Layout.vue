<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import LetPart from './LetPart.vue';
import RightPart from './RightPart.vue';

import { getWeaponDetailed } from '@/apis/detailed';
import type { BaseData, DetailedData } from '@/types';

const route = useRoute();

const baseInfo = ref<BaseData | null>(null)
const detailedInfo = ref<DetailedData | null>(null)

const getWeaponDetailedFn = async (weaname: string): Promise<void> => {
  const data = await getWeaponDetailed(weaname);
  baseInfo.value = data.baseData;
  detailedInfo.value = data.detailedData;
};

onMounted(() => {
  const weaname = route.query.name as string
  getWeaponDetailedFn(weaname);
});
</script>

<template>
  <div class="info-box">
    <LetPart :baseInfo="baseInfo"/>
    <RightPart :detailedInfo="detailedInfo"/>
  </div>
</template>

<style scoped>
.info-box {
  display: flex;
  background-color: #1f1f1f;
}
</style>
