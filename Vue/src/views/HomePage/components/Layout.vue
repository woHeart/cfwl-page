<script setup lang="ts">
import B from '@/assets/Home/B.png'
import H from '@/assets/Home/H.png'
import Bc from '@/assets/Home/Bc.png'
import Hc from '@/assets/Home/Hc.png'
import NewCharacters from '@/assets/Home/NewCharacters.png'
import Bbio from '@/assets/Home/Bbio.png'
import Hbio from '@/assets/Home/Hbio.png'
import BLE from '@/assets/Home/BLE.png'
import HDL from '@/assets/Home/HDL.png'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useWindowStore } from '@/stores/counter'

const windowStore = useWindowStore()

let removeListener: ReturnType<typeof windowStore.watchWindowResize> | undefined

const winStyle = computed(() => {
  const baseWidth = `${window.innerWidth - windowStore.useWindow.padding * 2 - 7}px`;
  const baseHeight = `${window.innerHeight - 136}px` // 36 90 10
  return {
    width: baseWidth,
    height: baseHeight
  }
})

const isChoose = ref<number | string>('初始')

const part = computed((): string[] => {
  if (isChoose.value === 0 || isChoose.value === '初始') {
    return [BLE, Bc, H]
  } else {
    return [HDL, B, Hc]
  }
})

onMounted(() => {
  removeListener = windowStore.watchWindowResize()
})
onUnmounted(() => {
  removeListener?.()
})
</script>

<template>
  <div class="box" :style="winStyle">
    <div class="role-main">
      <Transition name="main-img-change" mode="out-in">
        <img :src="part[0]" alt="" :key="isChoose">
      </Transition>
    </div>
    <div class="role-avatar">
      <img :src="NewCharacters" alt="" style="margin-bottom: 10px;">
      <img :src="part[1]" alt="" style="cursor: pointer;" @click="isChoose = 0">
      <img :src="part[2]" alt="" style="cursor: pointer;" @click="isChoose = 1">
    </div>
    <div class="role-bio-box">
      <div class="role-bio-bg"></div>
      <div class="fir-role-bio" :class="{ 'swap': isChoose === 1, 'reverse': isChoose === 0 }">
        <img :src="Bbio" alt="">
      </div>
      <div class="sec-role-bio" :class="{ 'swap': isChoose === 1, 'reverse': isChoose === 0 }">
        <img :src="Hbio" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: relative;
  overflow: hidden;
}

.main-img-change-enter-from {
  opacity: 0;
}

.main-img-change-leave-to {
  opacity: 0;
}

.main-img-change-enter-active,
.main-img-change-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.role-main img {
  position: absolute;
  width: 105%;
  filter: drop-shadow(4px 4px 18px rgba(20, 20, 30, 0.35));
  transform: translate(-6%, -70px);
}

.role-avatar {
  display: flex;
  position: absolute;
  width: 100%;
  flex-direction: column;
  transform: translate(70px, 10px);
}

.role-avatar img {
  width: 12%;
}

.fir-role-bio {
  contain: paint;
  position: absolute;
  width: 300px;
  height: 320px;
  opacity: 1;
  z-index: 3;
  box-shadow: var(--el-box-shadow-light);
  background-color: #f8f8f8;
  will-change: transform;
  transform: translate(820px, 50px) translateZ(0);
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
}

.fir-role-bio img {
  width: 84%;
  margin: 8% 8%;
  filter:
    drop-shadow(0 0 1px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 2px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 3px rgba(0, 0, 0, 0.3)) drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
}

.fir-role-bio.swap {
  z-index: 1;
  animation: Darken 1s ease-in-out forwards;
}

.fir-role-bio.reverse {
  z-index: 3;
  animation: Brighten 1s ease-in-out forwards;
}

.sec-role-bio {
  contain: paint;
  position: absolute;
  width: 300px;
  height: 320px;
  opacity: 0.3;
  z-index: 1;
  box-shadow: var(--el-box-shadow-light);
  background-color: #f8f8f8;
  will-change: transform;
  transform: translate(1010px, 260px) translateZ(0);
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
}

.sec-role-bio img {
  width: 84%;
  margin: 8% 8%;
  filter:
    drop-shadow(0 0 1px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 2px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 3px rgba(0, 0, 0, 0.3)) drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
}

.sec-role-bio.swap {
  z-index: 3;
  animation: Brighten 1s ease-in-out forwards;
}

.sec-role-bio.reverse {
  z-index: 1;
  animation: Darken 1s ease-in-out forwards;
}

@keyframes Darken {
  0% {
    opacity: 1;
    transform: translate(820px, 50px);
  }

  50% {
    opacity: 0.6;
    transform: translate(1010px, 50px);
  }

  100% {
    opacity: 0.3;
    transform: translate(1010px, 260px);
  }
}

@keyframes Brighten {
  0% {
    opacity: 0.3;
    transform: translate(1010px, 260px);
  }

  50% {
    opacity: 0.6;
    transform: translate(820px, 260px);
  }

  100% {
    opacity: 1;
    transform: translate(820px, 50px);
  }
}
</style>
