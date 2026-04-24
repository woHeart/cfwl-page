<script setup lang="ts">
import { computed, ref } from 'vue';

import attack from '@/assets/Weapon/攻击.png';
import life from '@/assets/Weapon/生命.png';
import practical from '@/assets/Weapon/现实防御.png';
import psychological from '@/assets/Weapon/精神防御.png';
import main from '@/assets/Weapon/仪式威力.png';

import PseudoElements from './module/PseudoElements.vue';
import type { DetailedData, Dict } from '@/types';

const { detailedInfo } = defineProps<{
  detailedInfo: DetailedData
}>()

const whitchDetail = ref<number>(0)
const whitchAmplify = ref<number>(0)

const detailImg = ref<string[]>([attack, life, practical, psychological, main])

const baseDetailList = computed((): Dict[] => {
  const improveBaseDict: Dict = detailedInfo.improveBaseDict
  if (Object.values(improveBaseDict)[0] === "None") {
    Object.keys(improveBaseDict).forEach(key => {
      improveBaseDict[key] = '0';
    });
  }
  return [detailedInfo.baseDict, improveBaseDict]
})
const uniqueDetailList = computed((): Dict[] => [detailedInfo.uniqueDict, detailedInfo.improveUniqueDict])
</script>

<template>
  <div class="info" v-if="detailedInfo">
    <!-- tag -->
    <div class="tag-box" v-if="detailedInfo.tag != 'None'">
      <p class="tag">{{ detailedInfo.tag }}</p>
    </div>
    <div class="tag-box" v-else>
      <p class="tag"></p>
    </div>
    <!-- detail-moduel -->
    <PseudoElements :chinese="'详情'" :english="'DETAIL'" />
    <!-- 选择初始或者满级属性 -->
    <div class="detail-box">
      <!-- detail -->
      <ul class="detail-data-list">
        <li class="detail-data-item" v-for="(k, v, i) in baseDetailList[whitchDetail]" :key="i">
          <div class="item-left">
            <img :src="detailImg[i]" alt="" class="property-img">
            <p>{{ v }}</p>
          </div>
          <div class="item-right">
            <p>{{ k }}</p>
          </div>
        </li>
        <div class="is-show" v-if="!('None' in detailedInfo.uniqueDict && 'None' in detailedInfo.improveUniqueDict)">
          <li class="detail-data-item" v-for="(k, v, i) in uniqueDetailList[whitchDetail]" :key="i">
            <div class="item-left">
              <img :src="detailImg[4]" alt="" class="property-img">
              <p>{{ v }}</p>
            </div>
            <div class="item-right">
              <p>{{ k }}</p>
            </div>
          </li>
        </div>
      </ul>
      <!-- choose -->
      <ul class="choose-detail">
        <li class="choose-detail-item" :class="{ 'is-choose': whitchDetail === 0 }" @click="whitchDetail = 0">
          <p>初始</p>
        </li>
        <li class="choose-detail-item" :class="{ 'is-choose': whitchDetail === 1 }" @click="whitchDetail = 1">
          <p>满级</p>
        </li>
      </ul>
    </div>
    <!-- amplify-module -->
    <div v-if="!('None' in detailedInfo.amplifyDictionary)">
      <PseudoElements :chinese="'增幅'" :english="'AMPLIFY'" />
      <!-- 选择增幅等级 -->
      <div class="amplify-box">
        <!-- amplify -->
        <div class="amplify-data" v-html="detailedInfo.amplifyDictionary[whitchAmplify]"></div>
        <ul class="lv">
          <li class="lv-item" v-for="k, v, i in detailedInfo.amplifyDictionary" @click="whitchAmplify = i"
            :class="{ 'is-choose': whitchAmplify === i }" :key=k>Lv.{{ parseInt(v as string) + 1 }}</li>
        </ul>
      </div>
    </div>
    <!-- impression-module -->
    <PseudoElements :chinese="'印象'" :english="'IMPRESSION'" />
    <!-- impression -->
    <div class="impression-data" v-html="detailedInfo.impression">
    </div>
  </div>
</template>

<style scoped>
.info {
  font-size: 20px;
  width: 40%;
  margin: 0 2% 3%;
}

.tag-box {
  font-size: 1.2em;
  margin-top: 1em;
  height: 2.4em;
  line-height: 2.4em;
  padding-left: .5em;
  color: #e3e3e3e3;
  background-color: #ffffff11;
  font-family: 'STZhongSong', 'Source Han Serif SC', 'Bookman Old Style', 'Noto Serif SC', 'Times New Roman', 'STSong', serif, 'SimSun';
}

.detail-box {
  position: relative;
}

.detail-data-list {
  margin-top: .8em;
}

.detail-data-item {
  height: 1.6em;
  display: flex;
  align-items: center;
}

.detail-data-item:nth-child(2),
.detail-data-item:nth-child(4) {
  background: linear-gradient(90deg, transparent, #aaa1, transparent);
  ;
}

.is-show .detail-data-item .item-left,
.is-show .detail-data-item .item-right {
  color: #ca9468;
}

.is-show .detail-data-item .property-img {
  filter: brightness(.4) sepia(1) saturate(3) hue-rotate(-5deg);
}

.item-left {
  color: #e3e3e3e3;
  display: flex;
}

.property-img {
  width: 20px;
  height: 20px;
}

.item-right {
  display: flex;
  flex: 1;
  justify-content: end;
  color: #e3e3e3e3;
}

.choose-detail {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: -2.16em;
  display: flex;
  color: #fff;
  font: inherit;
}

.choose-detail-item {
  opacity: .5;
  padding-left: .6em;
}

.is-choose {
  opacity: 1 !important;
  color: #ca9468 !important;
}

.choose-detail-item:hover {
  color: #ca9468;
  opacity: 1;
}

.amplify-box {
  position: relative;
}

.amplify-data {
  position: relative;
  margin-top: .5em;
  padding-left: 1em;
  padding-bottom: .5em;
  color: #e3e3e3e3;
  line-height: 1.3em;
}

.lv {
  cursor: pointer;
  position: absolute;
  display: flex;
  right: 0;
  top: -1.86em;
  color: #fff;
  font: inherit;
}

.lv-item {
  opacity: .5;
  padding-left: .6em;
}

.lv-item:hover {
  color: #ca9468;
  opacity: 1;
}

.amplify-data::before {
  position: absolute;
  left: 0;
  content: "\25C6";
  scale: .5;
}

.impression-data {
  padding-left: .3em;
  margin-top: .5em;
  color: #e3e3e3e3;
  line-height: 1.8em;
  font-family: 'STZhongSong', 'Source Han Serif SC', 'Bookman Old Style', 'Noto Serif SC', 'Times New Roman', 'STSong', serif, 'SimSun';
}

:deep(.reverse1999_text_blue) {
  color: #5e73a6;
}

:deep(.reverse1999_text_orange) {
  color: #c56032;
}
</style>
