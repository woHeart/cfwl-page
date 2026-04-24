<script setup lang="ts">
import { ref } from 'vue'
import type { StoryList } from '@/types'
import StoryChild from './StoryChild.vue';

import p1 from '@/assets/StoryImg/1.png';
import p2 from '@/assets/StoryImg/2.png';
import p3 from '@/assets/StoryImg/3.png';
import p4 from '@/assets/StoryImg/4.png';
import p5 from '@/assets/StoryImg/5.png';
import p6 from '@/assets/StoryImg/6.png';
import p7 from '@/assets/StoryImg/7.png';
import p8 from '@/assets/StoryImg/8.png';
import p9 from '@/assets/StoryImg/9.png';
import p10 from '@/assets/StoryImg/10.png';

const imagesOne = ref<StoryList>([[p1, '1st', '在我们的时代里'], [p2, '2nd', '夜色温柔'], [p3, '3rd', '故事一无所有'], [p4, '4th', '老虎的金黄'], [p5, '5th', '洞穴的囚徒']]);
const imagesTwo = ref<StoryList>([[p6, '6th', '今夜星光灿烂'], [p7, '7th', '孤独之歌'], [p8, '8th', '忧郁的热带'], [p9, '9th', '疯癫与文明'], [p10, '10th', '复乐园']]);
</script>

<template>
  <div class="box">
    <div class="all-story">
      <div class="one-story" v-for="(item, idx) in imagesOne" :key="idx">
        <StoryChild :story="item" />
      </div>
    </div>
    <div class="all-story">
      <div class="one-story" v-for="(item, idx) in imagesTwo" :key="idx">
        <StoryChild :story="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  margin-bottom: 50px;
}

.one-story {
  padding: 30px;
  margin-top: 25px;
  width: 13%;
  box-shadow: var(--el-box-shadow-dark);
}

.all-story {
  display: flex;
  justify-content: space-between;
}
</style>
