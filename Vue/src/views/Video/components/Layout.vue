<script setup lang="ts">
import PartName from './PartName.vue';
import Img from './Img.vue'
import Describe from './Describe.vue';

import { getVideo } from '@/apis/gallery';
import { onMounted, ref } from 'vue';
import type { VideoCard } from '@/types';

const versionIdx = ref<number>(0)
const videoData = ref<VideoCard[] | []>([])

const handleChange = (idx: number): void => {
  versionIdx.value = idx
}

const getVideoFn = async() => {
  videoData.value = await getVideo()
}

onMounted(() => {
  getVideoFn()
})
</script>

<template>
  <div class="center">
    <header>
      <PartName />
    </header>
    <main>
      <Img @change="handleChange" :videos="videoData"/>
      <Describe :versionIdx="versionIdx" :desc="videoData"/>
    </main>
  </div>
</template>

<style scoped>
main {
  position: relative;
  width: 100%;
}
</style>
