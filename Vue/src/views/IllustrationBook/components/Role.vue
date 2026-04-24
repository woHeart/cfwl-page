<script setup lang="ts">
import beast from '@/assets/Role/infoCareer/兽.png'
import tree from '@/assets/Role/infoCareer/木.png'
import star from '@/assets/Role/infoCareer/星.png'
import rock from '@/assets/Role/infoCareer/岩.png'
import spirit from '@/assets/Role/infoCareer/灵.png'
import wisdom from '@/assets/Role/infoCareer/智.png'

import six from '@/assets/Role/rarity/六.png'
import five from '@/assets/Role/rarity/五.png'
import four from '@/assets/Role/rarity/四.png'
import three from '@/assets/Role/rarity/三.png'
import two from '@/assets/Role/rarity/二.png'

import type { RoleCard, ImgMap } from '@/types'

const { roleData } = defineProps<{
  roleData: RoleCard
}>()

const bgImgList: ImgMap = { "六": six, "五": five, "四": four, "三": three, "二": two }
const careerList: ImgMap = { "兽": beast, "木": tree, "星": star, "岩": rock, "灵": spirit, "智": wisdom }

</script>

<template>
  <div class="img-box">
    <div class="role-img-box">
      <img class="role-img" v-lazy="roleData.initImg">
      <img class="role-img" v-lazy="roleData.gramentImg">
      <img :src="bgImgList[roleData.bgImg]" alt="" class="bg-img">
    </div>
    <img :src="careerList[roleData.career]" alt="" class="career-img"/>
    <div class="name-overlay" v-html="roleData.name"></div>
  </div>
</template>

<style scoped>
.img-box {
  position: relative;
  cursor: pointer;
}

.img-box:hover .role-img {
  transform: translateX(-100%);
}

.role-img-box {
  width: 100%;
  display: flex;
  border-radius: 5px;
  overflow: hidden;
}

.role-img {
  width: 100%;
  height: 242px;
  min-width: 100%;
  transition: all ease-out 0.3s;
}

.bg-img {
  position: absolute;
  width: 100%;
  bottom: 0;
  border-radius: 0 0 5px 5px;
}

.career-img {
  width: 18%;
  position: absolute;
  top: -1.5%;
  left: 2.5%;
  z-index: 2;
}

.name-overlay {
  position: absolute;
  left: 0;
  bottom: 12%;
  width: 100%;
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px #00000033, 1px -1px #00000033, -1px 1px #00000033, -1px -1px #00000033;
  font-family: '华文中宋', 'Source Han Serif SC', 'Times New Roman', '华文宋体', serif, 'SimSun';
  font-size: 18px;
  z-index: 2;
}
</style>
