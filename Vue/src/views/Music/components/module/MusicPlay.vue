<script setup lang="ts">
import { onMounted, ref } from 'vue';

import pre from '@/assets/Music/pre.png'
import next from '@/assets/Music/next.png'
import play from '@/assets/Music/play.png'
import stop from '@/assets/Music/stop.png'

import { onClickOutside } from '@vueuse/core'
import { getMusic } from '@/apis/gallery';
import type { MusicCard } from '@/types';

const { isBoxDrag } = defineProps<{
  isBoxDrag: boolean
}>()

// 音频元素的ref
const audioRef = ref<HTMLAudioElement | null>(null)
// 歌曲列表的ref
const isShowRef = ref<HTMLDivElement | null>(null)

const isCloseMusic = ref<boolean>(true)
const musicIndex = ref<number>(0)
const isProgressDrag = ref<boolean>(false)
const isPlay = ref<boolean>(false)
const isShow = ref<boolean>(false)
const musicInfo = ref<MusicCard[] | null>(null)

const emit = defineEmits<{ 'changeMusic': [isClose: boolean] }>()

const hideMusic = (): void => {
  isCloseMusic.value = !isCloseMusic.value
  emit('changeMusic', isCloseMusic.value)
}

const openMusic = (): void => {
  if (isBoxDrag) return
  isCloseMusic.value = !isCloseMusic.value
  emit('changeMusic', isCloseMusic.value)
}

const getMusicFn = async (): Promise<void> => {
  musicInfo.value = await getMusic();
}

// 当前时长
const currentTime = ref<number>(0)
const handleTimeUpdate = (): void => {
  if (isProgressDrag.value) return
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
  }
}

// 总时长
const totalDuration = ref<number>(0)
const handleLoadedMetadata = (): void => {
  if (audioRef.value) {
    totalDuration.value = audioRef.value.duration;
  }
}

// 拖动进度条
const handleProgressInput = (e: Event): void => {
  currentTime.value = Number((e.target as HTMLInputElement).value)
}

// 拖动结束时设置音乐的时间
const handleProgressChange = (): void => {
  isProgressDrag.value = false
  if (audioRef.value) {
    audioRef.value.currentTime = currentTime.value
  }
}

const waitAudioLoad = (audio: HTMLAudioElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    const onCanPlay = () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('error', onError);
      resolve();
    };
    const onError = () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('error', onError);
      reject(new Error('音乐获取失败'))
    };
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('error', onError);
    audio.load();
  });
};
// 上一首
const preMusic = async (): Promise<void> => {
  if (!audioRef.value) return;
  if (musicIndex.value === 0) return;
  musicIndex.value--
  try {
    await waitAudioLoad(audioRef.value);
    if (isPlay.value) return audioRef.value.play()
  } catch (err) {
    console.error('切换上一首歌曲失败:', err);
  }
}
// 下一首
const nextMusic = async (): Promise<void> => {
  if (!audioRef.value) return;
  if (musicIndex.value + 1 === musicInfo.value?.length) return;
  musicIndex.value++
  try {
    await waitAudioLoad(audioRef.value);
    if (isPlay.value) return audioRef.value.play()
  } catch (err) {
    console.error('切换下一首歌曲失败:', err);
  }
}

// 切换播放
const togglePlay = (): void => {
  if (audioRef.value) {
    if (isPlay.value) {
      audioRef.value.pause()
    } else {
      audioRef.value.play()
    }
    isPlay.value = !isPlay.value
  }
}

// 格式化时间
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const remainingSeconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// 点击外部删掉盒子
onClickOutside(isShowRef, () => {
  isShow.value = false
})

// 无限滚动的元素数量
const count = ref<number>(5)
function handleLoad() {
  if (count.value === musicInfo.value?.length) return
  count.value += 3
}

const changeMusic = async (index: number): Promise<void> => {
  if (!audioRef.value) return;
  musicIndex.value = index;
  try {
    await waitAudioLoad(audioRef.value);
    if (isPlay.value) return audioRef.value.play()
  } catch (err) {
    console.error('切换上一首歌曲失败:', err);
  }
}

onMounted(() => {
  getMusicFn()
})
</script>

<template>
  <div v-if="musicInfo">

    <div class="music-box" v-show="!isCloseMusic">

      <div class="music-header">
        <div class="music-info" @click="isShow = true">
          <div style="width: 46px; height: 38px;">
            <Transition name="music-fade" mode="out-in">
              <img :src="musicInfo[musicIndex]?.bigCoverUrl" :key="musicInfo[musicIndex]?.bigCoverUrl" alt=""
                class="music-picture" @click.stop="hideMusic" >
            </Transition>
          </div>
          <span class="music-title">{{ musicInfo[musicIndex]?.title }}</span>
        </div>
        <el-icon class="hide-music" @click="hideMusic">
          <IEpClose />
        </el-icon>
      </div>

      <!-- 进度条 -->
      <div class="progress">
        <span class="duration">{{ formatTime(currentTime) }}</span>
        <input type="range" class="music-progress" :value="currentTime" :max="totalDuration"
          @mousedown="isProgressDrag = true" @touchstart="isProgressDrag = true" @input="handleProgressInput"
          @change="handleProgressChange">
        <span class="duration">{{ formatTime(totalDuration) }}</span>
      </div>

      <ul class="controls">
        <li class="pre"><img :src="pre" alt="" @click="preMusic"></li>
        <li class="togglePlay"><img :src="isPlay ? stop : play" alt="" @click="togglePlay"></li>
        <li class="next"><img :src="next" alt="" @click="nextMusic"></li>
      </ul>

      <!-- 音频 -->
      <audio ref="audioRef" :src="musicInfo[musicIndex].musicUrl" @timeupdate="handleTimeUpdate"
        @loadedmetadata="handleLoadedMetadata">
      </audio>

      <Transition name="music-fade" mode="out-in">
        <div class="change" v-if="isShow" ref="isShowRef">
          <n-infinite-scroll style="height: 210px; background-color: #000; border-radius: 8px;" :distance="50"
            @load="handleLoad">
            <div v-for="(item, idx) in count" :key="idx" class="item" @click="changeMusic(idx)">
              <img :src="musicInfo[idx]?.bigCoverUrl" alt="" class="music-picture">
              <span class="music-title">{{ musicInfo[idx]?.title }}</span>
            </div>
          </n-infinite-scroll>
        </div>
      </Transition>

    </div>

    <div v-show="isCloseMusic" @click="openMusic" class="open-music" draggable="false">
      <img :src="musicInfo?.[musicIndex]?.bigCoverUrl" alt="" draggable="false">
    </div>

  </div>
</template>

<style scoped>
.music-box {
  position: relative;
  width: 230px;
  height: 102px;
  padding: 7px;
  background-color: #000;
  border-radius: 8px;
}

.music-header {
  display: flex;
  height: 38px;
  align-items: center;
  margin-bottom: 5px;
  justify-content: space-between;
}

.music-info {
  display: flex;
  height: 38px;
  align-items: center;
  cursor: pointer;
}

.music-info:hover span {
  color: #E6D4BC;
}

.music-fade-enter-from {
  opacity: 0;
}

.music-fade-enter-active,
.music-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.music-fade-leave-to {
  opacity: 0;
}

.music-picture {
  width: 38px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  margin-left: 8px;
}

.music-title {
  font-size: 15px;
  color: #BBA893;
  margin-left: 7px;
  transition: all 0.3s;
  white-space: nowrap;
}

.hide-music {
  color: #BBA893;
  font-size: 22px;
  margin-right: 8px;
}

.hide-music :hover {
  color: #E6D4BC;
  cursor: pointer;
}

.progress {
  display: flex;
  gap: 0.3em;
  align-items: center;
}

.music-progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  border: 0;
  border-radius: 50%;
  background-color: #b55829;
}

.music-progress::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border: 0;
  border-radius: 50%;
  background-color: #b55829;
}

.music-progress::-ms-thumb {
  width: 10px;
  height: 10px;
  border: 0;
  border-radius: 50%;
  background-color: #b55829;
}

.music-progress {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 3px;
  background: #e0e0e0;
}

.music-progress:active {
  cursor: pointer;
}

.duration {
  font-size: 0.8em;
  color: #666;
}

.controls {
  display: flex;
  margin-top: 0.3em;
  align-items: center;
  justify-content: space-around;
}

.pre,
.next {
  width: 18%;
}

.togglePlay {
  width: 18%;
}

.controls img {
  width: 100%;
  cursor: pointer;
}

.change {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  transform: translateX(102%);
}

.item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 3%;
  cursor: pointer;
}

.item::after {
  content: '';
  position: absolute;
  left: 1em;
  right: 1em;
  bottom: 0;
  height: 0.05em;
  background-color: #BBA893;
}

.item:last-child::after {
  display: none;
}

.item:hover span {
  color: #E6D4BC;
}

:deep(.n-scrollbar-rail__scrollbar) {
  background-color: rgba(255, 255, 255, 0.5) !important;
}

.open-music {
  position: absolute;
  height: 38px;
  left: 15px;
  top: 7px;
  cursor: pointer;
}

.open-music img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  user-select: none;
}
</style>
