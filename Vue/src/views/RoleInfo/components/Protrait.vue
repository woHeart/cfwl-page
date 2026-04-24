<script setup lang="ts">
import { computed } from 'vue';

import PartName from '../module/PartName.vue';
import type { RoleImprove } from '@/types';

const { portraitData } = defineProps<{
  portraitData: RoleImprove
}>()

const portraitList = computed((): string[] => [
    portraitData.firstPortrait,
    portraitData.secondPortrait,
    portraitData.thirdPortrait,
    portraitData.fifthPortrait,
    portraitData.fourthPortrait
  ])
</script>

<template>
  <div class="container" v-if="portraitData">
    <PartName :chinese="'塑造'" :english="'portrait'" />
    <ul class="portrait-list">
      <li v-for="(item, index) in portraitList" :key="index" class="portrait-item">
        <div class="serial">
          <span class="let-serial">Lv.</span>
          <span class="right-serial">{{ index+1 }}</span>
        </div>
        <div class="portrait-text" v-html="item"></div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  padding: 0 5% 0 5%;
}

.portrait-item {
  display: flex;
  margin-bottom: 15px;
}

.serial {
  margin-right: 12px;
}

.let-serial {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}

.right-serial {
  font-size: 20px;
  color: rgba(0, 0, 0, 1);
}

.portrait-text {
  font-size: 16px;
  line-height: 22px;
}

:deep(.reverse1999_text_blue) {
  color: #5e73a6;
}

:deep(.reverse1999_text_orange) {
  color: #c56032;
}
</style>
