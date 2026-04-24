<script setup lang="ts">
import { useRoute } from 'vue-router'

import Reality from '@/assets/TypeInjury/现实.png'
import Spirit from '@/assets/TypeInjury/精神.png'

import beast from '@/assets/Role/infoCareer/兽.png'
import tree from '@/assets/Role/infoCareer/木.png'
import star from '@/assets/Role/infoCareer/星.png'
import rock from '@/assets/Role/infoCareer/岩.png'
import spirit from '@/assets/Role/infoCareer/灵.png'
import wisdom from '@/assets/Role/infoCareer/智.png'

import type { RoleBase, ImgMap } from '@/types'

const { characterData } = defineProps<{
  characterData: RoleBase
}>()

const route = useRoute()
const career = route.query.career as string

const careerList: ImgMap = { "兽": beast, "木": tree, "星": star, "岩": rock, "灵": spirit, "智": wisdom }
const typeInjury: ImgMap = {'现实创伤': Reality, '精神创伤': Spirit}
</script>

<template>
  <div>
    <div class="top-box" v-if="characterData">
      <img class="attribute" :src="careerList[career]" alt="属性" />
      <div class="name">
        <div class="chinese">{{ characterData.chinese }}</div>
        <div class="english">{{ characterData.english }}</div>
      </div>
    </div>
    <div class="bottom-box">
      <img class="type-img" :src="typeInjury[characterData?.simplePosition]" alt="类型">
      <div class="info">
        <p class="type-text">{{ characterData?.simplePosition }}</p>
        <p class="detailed">{{ characterData?.detailedPosition }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-box {
  display: flex;
}

.attribute {
  width: 48px;
  height: 80px;
}

.name {
  margin-left: 8px;
  height: 80px;
}

.chinese {
  height: 42.85px;
  line-height: 42.85px;
  font-size: 30px;
  font-family: '宋体';
  font-weight: bold;
}

.english {
  font-size: 16px;
}

.bottom-box {
  display: flex;
  margin-top: 30px;
  margin-left: 56px;
}

.type-img {
  width: 48px;
  height: 48px;
  margin-right: 8px;
}

.info {
  display: flex;
  align-items: center;
}

.type-text {
  font-weight: bold;
  margin-right: 8px;
  font-size: 20px;
  font-family: '宋体';
}

.detailed {
  font-size: 18px;
}
</style>
