<script setup lang="ts">
import bg from '@/assets/Gallery/title_bgi.png'
import type { VideoCard } from '@/types';
const { desc, versionIdx } = defineProps<{
  desc: VideoCard[];
  versionIdx: number;
}>()
</script>

<template>
  <div class="all" v-if="desc.length">
    <span class="title">
      {{ desc[versionIdx].title }}
    </span>
    <span class="content">
      {{ desc[versionIdx].desc }}
    </span>
    <img :src="bg" alt="">
  </div>
</template>

<style scoped>
.all {
  position: absolute;
  width: 38%;
  right: 0;
  top: 0;
  margin-top: 20px;
}

.title {
  display: block;
  color: #333333;
  line-height: 50px;
  font-weight: 500;
  font-size: 45px;
  text-indent: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.content {
  display: block;
  margin: 5% 10% 0 5%;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 1px;
  white-space: pre-line;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

img {
  position: absolute;
  width: 70%;
  top: 0;
  left: 0;
  z-index: -3;
}
</style>
