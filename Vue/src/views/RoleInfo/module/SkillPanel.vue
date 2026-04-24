<script setup lang="ts">
import { computed } from 'vue';
import enhance from '@/assets/Text/enhance.png'
import SkillDetail from './SkillDetail.vue'
import type { OneSkill } from '@/types';

const { skillData } = defineProps<{
  skillData: OneSkill
}>()

const base = computed(() => skillData[0])
const firstDetailed = computed(() => skillData[1])
const secondDetailed = computed(() => skillData[2])
const thirdDetailed = computed(() => skillData[3])
</script>

<template>
  <ul class="incantation-list">
    <li class="skill-img-box">
      <img :src="base?.[0]" alt="" class="skill-img">
    </li>
    <li class="module-box">
      <SkillDetail :data="firstDetailed" :type="base?.[1]" />
    </li>
    <li class="enhance-box">
      <img :src="enhance" alt="" class="enhance">
    </li>
    <li class="module-box">
      <SkillDetail :data="secondDetailed" :type="base?.[1]" />
    </li>
    <li class="enhance-box">
      <img :src="enhance" alt="" class="enhance">
    </li>
    <li class="module-box">
      <SkillDetail :data="thirdDetailed" :type="base?.[1]" />
    </li>
  </ul>
</template>

<style scoped>
.incantation-list {
  display: flex;
  margin-bottom: 20px;
}

.skill-img-box {
  padding-right: 1%;
}

.skill-img {
  width: 144px;
}

.module-box {
  width: 30%;
}

.enhance-box {
  width: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.enhance {
  width: 16px;
  height: 20px;
}
</style>
