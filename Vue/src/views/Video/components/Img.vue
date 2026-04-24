<script setup lang="ts">
import { ref, watch } from 'vue';

import play from '@/assets/Gallery/play.webp'
import type { VideoCard } from '@/types';

const { videos } = defineProps<{
  videos: VideoCard[]
}>()

const versionIdx = ref<number>(0)
const showVideo = ref<boolean>(false)

const changeImg = (idx: number): void => {
  versionIdx.value = idx
}

const emit = defineEmits<{ 'change': [idx: number] }>();
const enrollSuccess = (): void => {
  emit('change', versionIdx.value)
}

watch(
  () => versionIdx.value,
  enrollSuccess
)
</script>

<template>
  <div class="all" v-if="videos.length">
    <div class="big">
      <img :src="videos[versionIdx].bigCoverUrl" alt="" class="big-img">
      <img :src="play" alt="" class="play" @click="showVideo = true">
    </div>
    <div class="video-box" @click="showVideo = false" v-if="showVideo">
      <video :src="videos[versionIdx].videoUrl" controls @click.stop class="video"></video>
    </div>
    <div class="small">
      <n-carousel class="banner" :space-between="20" :loop="false" slides-per-view="auto" draggable
        v-model:current-index="versionIdx" :show-dots="false">
        <n-carousel-item style="width: 25%" v-for="(i, index) in videos.length" :key="index">
          <img class="carousel-img" :class="{ 'img-active': versionIdx === index }" :src="videos[index].smallCoverUrl"
            @click="changeImg(index)">
          <div v-html="videos[index].title" class="title" :class="{ 'span-active': versionIdx === index }"></div>
        </n-carousel-item>
      </n-carousel>
    </div>
  </div>
</template>

<style scoped>
.big {
  width: 60%;
  position: relative;
}

.big-img {

  width: 100%;
  border-top-right-radius: 150px;
}

.play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.video-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 5;
}

.video {
  width: 80%;
  z-index: 999;
}

.banner {
  position: absolute;
  width: 50%;
  right: 0;
  top: 70%;
}

.carousel-img {
  width: 90%;
  border-top-left-radius: 40%;
}

.n-carousel {
  height: 45%;
}

.title {
  margin-top: 5px;
  font-size: 18px;
  opacity: 0.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.img-active {
  border: 2px solid #db6f39;
  ;
}

.span-active {
  color: #333333;
  opacity: 1;
}
</style>
