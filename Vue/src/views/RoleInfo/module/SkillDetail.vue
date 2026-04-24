<script setup lang="ts">
import Attack from '@/assets/Role/skillType/Attack.png'
import Buff from '@/assets/Role/skillType/Buff.png'
import Channel from '@/assets/Role/skillType/Channel.png'
import Counter from '@/assets/Role/skillType/Counter.png'
import Debuff from '@/assets/Role/skillType/Debuff.png'
import Health from '@/assets/Role/skillType/Health.png'

import type { ImgMap, SkillDetail } from '@/types'

const { data, type } = defineProps<{
  data: SkillDetail,
  type: string
}>();

const skillTypeList: ImgMap = {
  "Attack": Attack,
  "Buff": Buff,
  "Channel": Channel,
  "Counter": Counter,
  "Debuff": Debuff,
  "Health": Health
}
</script>

<template>
  <div class="skill-content">
    <!-- 第一层 -->
    <div class="first-layer">
      <div class="one-row">{{ data?.name }}</div>
      <div class="two-row">{{ data?.content }}</div>
    </div>
    <!-- 第二层 -->
    <div class="second-layer" v-html="data?.info"></div>
    <!-- 第三层 -->
    <div class="third-layer">
      <img :src="skillTypeList?.[type]" alt="示例图片" class="image-container" />
    </div>
  </div>
</template>

<style scoped>
.skill-content {
  height: 100%;
  width: 100%;
}

.first-layer {
  height: 56px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.one-row {
  font-size: 20px;
  font-family: '宋体';
  color: rgba(0, 0, 0, 1);
}

.two-row {
  font-size: 14px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.6);
}

.second-layer {
  box-sizing: border-box;
  height: calc(100% - 85px);
  padding-top: 0.3%;
  font-size: 16px;
  line-height: 22px;
}

.third-layer {
  height: 28px;
  display: flex;
  justify-content: flex-end;
}

.image-container {
  height: 28px;
}

:deep(.reverse1999_text_blue) {
  color: #5e73a6;
}

:deep(.reverse1999_text_orange) {
  color: #c56032;
}
</style>
