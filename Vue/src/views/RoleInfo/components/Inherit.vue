<script setup lang="ts">
import { computed, ref } from 'vue'

import one from '@/assets/Role/insight/one.png'
import two from '@/assets/Role/insight/two.png'
import three from '@/assets/Role/insight/three.png'

import PartName from '../module/PartName.vue';
import type { RoleImprove } from '@/types';

const { inheritData } = defineProps<{
  inheritData: RoleImprove
}>()

const isInheritThree = ref<string>("<p class=\"mw-empty-elt\"></p>\n") // 数据库中如果没有洞悉三会呈现的数据
const baseList = ref<[string, string][]>([[one, '[洞悉一]'], [two, '[洞悉二]'], [three, '[洞悉三]']])

const inherit = computed((): string[] => [inheritData.firstInherit, inheritData.secondInherit, inheritData.thirdInherit])
</script>

<template>
  <div class="container" v-if="inheritData">
    <PartName :chinese="'传承'" :english="'inherit'" />
    <ul class="inherit-list">
      <li v-for="(item, index) in baseList" :key="index" class="inherit-item">
        <img :src="item[0]" alt="技能图片" class="inherit-img" v-if="!(inherit[index] === isInheritThree)" />
        <div class="text" v-if="!(inherit[index] === isInheritThree)">
          <div class="witch-inherit-text">{{ item[1] }}</div>
          <div class="inherit-text" v-html="inherit[index]"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  width: 86.42%;
}

.inherit-item {
  display: flex;
  margin-bottom: 15px;
}

.inherit-img {
  width: 36px;
  height: 36px;
  padding-right: 12px;
}

.text {
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
