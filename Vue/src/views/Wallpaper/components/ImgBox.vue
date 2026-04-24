<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import throttle from 'lodash/throttle';
import { getAtlas } from '@/apis/gallery';
import type { ThrottleOptions } from '@/types';

const isLoading = ref<boolean>(false)
//五列所各自对应的ref组成的数组
const columnRefList = ref<(HTMLElement | null)[]>(Array(5).fill(null))
//请求一次获取的数据
const imgList = ref<string[]>([])
//判断是否已加载过图片，使图片唯一
const loadedImgsObj = new Set<string>()
//五列所各自拥有的图片，组成一个数组
const allImgSrc = ref<string[][]>(Array(5).fill(null).map(() => []))
//所有的图片
const srcList = ref<string[]>([]);

const page = ref<number>(1)
const isMore = ref<boolean>(true)

const loadImgList = (index: number): Promise<void> => {
  isLoading.value = true
  if (index > imgList.value.length - 1) return Promise.resolve();
  const url: string = imgList.value[index];
  if (loadedImgsObj.has(url)) {
    return loadImgList(index + 1);
  }
  const imgObj = new Image();
  imgObj.src = url
  loadedImgsObj.add(url);
  return new Promise((resolve) => {
    imgObj.onload = () => {
      const columns: HTMLElement[] = columnRefList.value.filter((el): el is HTMLElement => el !== null);
      const columnHeights: number[] = Array.from(columns).map(col => col.offsetHeight);
      const shortestIndex: number = columnHeights.indexOf(Math.min(...columnHeights));
      allImgSrc.value[shortestIndex].push(imgObj.src);
      srcList.value.push(imgObj.src);
      resolve(loadImgList(index + 1))
    }
    imgObj.onerror = () => {
      console.error(`图片加载失败：${url}`);
      resolve(loadImgList(index + 1));
    }
  })
}

// 同时new Promise，然后Promise.all，但可能会在同一行同时加载了很多图片
// const pushOnceImg = (url: string): void => {
//   const columns = columnRefList.value;
//   const columnHeights = Array.from(columns).map(col => col.offsetHeight);
//   const shortestIndex = columnHeights.indexOf(Math.min(...columnHeights));
//   allImgSrc.value[shortestIndex].push(url);
//   srcList.value.push(url);
// }

// const loadImgList = async () => {
//   isLoading.value = true
//   try {
//     const loadPromise = imgList.value.map((url) => {
//       return new Promise((resolve, reject) => {
//         if (loadedImgsObj.has(url)) {
//           resolve(url)
//           return
//         }
//         const imgObj = new Image()
//         imgObj.src = url
//         loadedImgsObj.add(url)
//         imgObj.onload = () => {
//           pushOnceImg(url)
//           resolve(url)
//         }
//       })
//     })
//     await Promise.all(loadPromise)
//   } catch (error) {
//     console.error(error)
//   } finally {
//     isLoading.value = false
//   }
// }

const getAtlasFn = async (page: number): Promise<void> => {
  if (!isMore.value) return;
  try {
    const data = await getAtlas(page)
    imgList.value = data.results
    isMore.value = data.isMore
  } catch (error) {
    console.log(error)
  }
}

const handleScroll = throttle(async (): Promise<void> => {
  if (isLoading.value || !isMore.value) return
  const scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight: number = document.documentElement.clientHeight || window.innerHeight;
  const scrollHeight: number = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    page.value++;
    await getAtlasFn(page.value)
    await loadImgList(0);
    isLoading.value = false
  }
}, 600, {
  leading: true, // 开始时是否立即执行一次（默认 true）
  trailing: false // 结束后是否再执行一次（滚动场景建议 false，避免重复触发）
} as ThrottleOptions)

onMounted(async () => {
  await getAtlasFn(page.value)
  await loadImgList(0);
  isLoading.value = false
  window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <div class="image-container">
    <div class="image-column" v-for="i in 5" :key="i" :ref="el => { columnRefList[i - 1] = el as HTMLElement }">
      <el-image v-for="(url, idx) in allImgSrc[i - 1]" :key="idx" style="width: 100%" :src="url" :zoom-rate="1.2"
        :max-scale="7" :min-scale="0.2" :preview-src-list="srcList" show-progress fit="contain"
        :initial-index="srcList.indexOf(url)" lazy>
      </el-image>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 10px;
}

.image-column {
  width: calc(20% - 8px);
  gap: 8px;
  display: flex;
  flex-direction: column;
}
</style>
