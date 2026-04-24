<script setup lang="ts">
import { ref } from 'vue';
import MusicPlay from './module/MusicPlay.vue';

let startX: number = 0
let startY: number = 0
const top = ref<number>(15)
const left = ref<number>(65)
const transX = ref<number>(0)
const transY = ref<number>(0)
const isBoxDrag = ref<boolean>(false);
const isCloseMusic = ref<boolean>(true)

const musicStatus = (isClose: boolean): void => {
  isCloseMusic.value = isClose
}

const handleDown = (downEvent: MouseEvent): void => {
  if (!isCloseMusic.value) return
  isBoxDrag.value = false
  startX = downEvent.clientX
  startY = downEvent.clientY
  transX.value = startX - left.value
  transY.value = startY - top.value
  const handleMouseMove = (moveEvent: MouseEvent): void => {
    if (Math.abs(moveEvent.clientX - startX) > 1 || Math.abs(moveEvent.clientY - startY) > 1) {
      isBoxDrag.value = true
      let newX: number = moveEvent.clientX - transX.value
      let newY: number = moveEvent.clientY - transY.value
      newX = Math.max(0, Math.min(newX, window.innerWidth - 59)) // 7 7 38 7
      newY = Math.max(-136, Math.min(newY, window.innerHeight- 45 - 136)) // 36 90 10
      left.value = newX
      top.value = newY
    }
  }
  const handleMouseUp = (): void => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp);
  }
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}


</script>

<template>
  <div :style="{ transform: `translate(${left}px, ${top}px)` }" class="music-box" @mousedown="handleDown">
    <MusicPlay @change-music="musicStatus" :isBoxDrag />
  </div>
</template>

<style scoped>
.music-box {
  position: fixed;
  z-index: 999;
}
</style>
