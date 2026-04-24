<script setup lang="ts">
import { useRouter } from 'vue-router'
import p1 from '@/assets/Gallery/video_p1.png'
import p2 from '@/assets/Gallery/video_p2.gif'
import p3 from '@/assets/Gallery/video_p3.png'

const router = useRouter()
const to = function (): void {
  router.push('/video')
}
</script>

<template>
  <ul>
    <li><img :src="p1" alt="" class="imggg" @click="to()"></li>
    <li><img :src="p2" alt="" class="gifff" @click="to()"></li>
    <li class="box"><img :src="p3" alt="" class="enggg" @click="to()"></li>
  </ul>
</template>

<style scoped>
ul {
  position: relative;
  width: 280px;
  cursor: pointer;
}

.imggg {
  width: 100%;
}

.gifff {
  position: absolute;
  width: 60%;
  left: 130px;
  top: 55%;
}

.enggg {
  position: absolute;
  width: 70%;
  left: 100px;
  top: 75%;
  transition: all 0.5s ease;
}

ul:hover .enggg {
  transform: translateX(25%);
}
</style>
