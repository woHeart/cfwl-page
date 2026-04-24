<script setup lang="ts">
import { useRouter } from 'vue-router'
import p1 from '@/assets/Gallery/wallpaper_p1.png'
import p2 from '@/assets/Gallery/wallpaper_p2.png'
import p3 from '@/assets/Gallery/wallpaper_p3.png'

const router = useRouter()
const to = function (): void {
  router.push('/wallpaper')
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
  width: 360px;
  margin-top: 10px;
  cursor: pointer;
}

.imggg {
  width: 100%;
}

.gifff {
  position: absolute;
  width: 60%;
  right: -50px;
  top: 45%;
}

.enggg {
  position: absolute;
  width: 80%;
  right: 120px;
  top: 60%;
  transition: all 0.5s ease;
}

ul:hover .enggg {
  transform: translateX(-20%);
}
</style>
