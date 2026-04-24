<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

import { getWordBannerAPI } from '@/apis/theword'
import { useWindowStore } from '@/stores/counter'

const images = ref<string[]>()

//移除监听
let removeListener: ReturnType<typeof windowStore.watchWindowResize> | undefined

//监听窗口变化
const windowStore = useWindowStore()

//获取轮播图
const getWordBanner = async (): Promise<void> => {
  try {
    images.value = await getWordBannerAPI()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  removeListener = windowStore.watchWindowResize();
  getWordBanner()
})

onUnmounted(() => {
  removeListener?.()
})
</script>

<template>
  <div class="banner-box">
    <el-carousel :interval="2500" type="card" :style="{ height: windowStore.useWindow.height + 'px' }" class="banner">
      <el-carousel-item v-for="item in images" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.banner-box {
  padding-top: 50px;
  padding-bottom: 70px;
}
.banner ::v-deep .el-carousel__container {
  height: 100%;
}
</style>
