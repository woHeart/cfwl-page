<script setup lang="ts">
import type { WeaponCard } from '@/types';

const { weaponData, isWeaponTab } = defineProps<{
  weaponData: WeaponCard
  isWeaponTab: boolean
}>()
</script>

<template>
  <div class="weapon-box" v-if="isWeaponTab">
    <img class="weapon-image" :src="weaponData.url" alt="武器图片"/>
    <div class="weapon-name-box">
      <div class="weapon-name">{{ weaponData.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.weapon-box {
  position: relative;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
}

.weapon-image {
  width: 100%;
  background: rgba(245, 245, 245, 0.8);
}

.weapon-name-box {
  position: absolute;
  width: 100%;
  bottom: 16%;
  display: flex;
  justify-content: center;
}

.weapon-name {
  font-family: '宋体';
  font-size: 16px;
  font-weight: bold;
  color: white;
}
</style>
