<script setup lang="ts">
import { computed, ref } from 'vue';
import type { RoleBase } from '@/types';

const { roleImgData } = defineProps<{
  roleImgData: RoleBase
}>()

const isactive = ref<number>(0)

const makeActiveClass = (activeClass: string) => {
  return (index: number) => ({
    [activeClass]: isactive.value === index
  })
}

const iconClass = computed(() => makeActiveClass('icon-active'));
const iconItemClass = computed(() => makeActiveClass('icon-item-active'));
const textClass = computed(() => makeActiveClass('text-active'))

const changeButton = computed(() => roleImgData.changeContent === null ? ['初始'] : ['初始', roleImgData.changeContent])
const whichRoleImg = computed(() => isactive.value === 0 ? roleImgData.initImg : roleImgData.gramentImg)
const whichSign = computed(() => roleImgData.sign)
const whichContent = computed(() => isactive.value === 0 ? roleImgData.initContent : roleImgData.gramentContent)
</script>


<template>
  <div class="role-img-container" v-if="roleImgData">
    <!-- 切换图片 -->
    <div class="change">
      <div v-for="(value, index) in changeButton" :key="index" class="change-item" @click="isactive = index">
        <div class="icon" :class="iconClass(index)">
          <div class="icon-item" :class="iconItemClass(index)"></div>
        </div>
        <p class="text" :class="textClass(index)">{{ value }}</p>
      </div>
    </div>
    <!-- 黑框 -->
    <div class="border-box"></div>
    <!-- 角色和名字的图片 -->
    <div>
      <img class="main-img" :src="whichRoleImg" alt="Main Image" />
      <img class="corner-img" :src="whichSign" alt="Corner Image" />
    </div>
    <!-- 格言 -->
    <div class="big-talk">
      <p class="small-talk">{{ whichContent }}</p>
    </div>
  </div>
</template>

<style scoped>
.role-img-container {
  position: relative;
  display: flex;
  flex: 1;
}

.change {
  left: 10%;
  position: absolute;
  z-index: 5;
}

.change-item {
  height: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

/* 切换图片的按钮样式 */
.icon {
  padding: 2px;
  border: 1px solid;
  transform: rotate(45deg);
}

.icon-active {
  border: 1px solid #c56032;
}

.icon-item {
  width: 10px;
  height: 10px;
}

.icon-item-active {
  background-color: #c56032;
}

.text {
  font-size: 15px;
  font-family: '宋体';
  margin-left: 5px;
}

.text-active {
  font-size: 20px;
  color: #c56032;
}

.border-box {
  position: absolute;
  left: 20%;
  top: 10%;
  width: 60%;
  height: 80%;
  border: 2px solid #000;
  z-index: 1;
}

.main-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90%;
  z-index: 2;
}

.corner-img {
  position: absolute;
  right: 15%;
  bottom: 5%;
  height: 15%;
  z-index: 3;
}

.big-talk {
  width: 100%;
  position: absolute;
  bottom: 2%;
  display: flex;
  justify-content: center;
}

.small-talk {
  font-size: 20px;
  font-family: '宋体';
}
</style>
