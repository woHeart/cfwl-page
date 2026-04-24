<script setup lang="ts">
import star from '@/assets/Weapon/星星.png'
import type { BaseData } from '@/types';

const { baseInfo } = defineProps<{
  baseInfo: BaseData
}>()
</script>

<template>
  <div class="let-box" v-if="baseInfo">
    <img :src="baseInfo.url" class="weapon-img" alt="心相">
    <div class="weapon-name-box">
      <p class="chinese">{{ baseInfo.chinese }}</p>
      <p class="english">{{ baseInfo.english }}</p>
      <div class="stars-box">
        <img :src="star" alt="星星" class="star" v-for="value in baseInfo.level" :key="value">
      </div>
    </div>
  </div>
</template>

<style scoped>
.let-box {
  position: relative;
  width: 56%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.weapon-img {
  width: 90%;
}
.weapon-name-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 12%;
}
.chinese {
  padding-bottom: 8px;
  font-size: 36px;
  color: #fff;
  font-family: 'STZhongSong', 'Source Han Serif SC', 'Bookman Old Style', 'Noto Serif SC', 'Times New Roman', 'STSong', serif, 'SimSun';
}
.english {
  padding-bottom: 4px;
  font-size: 16px;
  letter-spacing: 3px;
  color: #ffffff88;
  font-family: 'Noto Sans SC', 'Microsoft Yahei', sans-serif;
  text-transform: uppercase;
}
.stars-box {
  height: 40px;
  display: flex;
  justify-content: center;
}
.star {
  font-size: 20px;
}
</style>
