<script setup lang="ts">
import Nav from './Nav.vue'
import Header from './Header.vue'
import Music from '@/views/Music/index.vue'
import { computed } from 'vue'
import { useWindowStore } from '@/stores/counter'
import { onMounted, onUnmounted } from 'vue'

const windowStore = useWindowStore()

let removeListener: ReturnType<typeof windowStore.watchWindowResize> | undefined

const contentStyle = computed(() => ({
  padding: `0 ${windowStore.useWindow.padding}px`
}))

onMounted(() => {
  removeListener = windowStore.watchWindowResize()
})
onUnmounted(() => {
  removeListener?.()
})
</script>

<template>
  <div>
    <Nav />
    <Header />
    <Music />
    <main :style="contentStyle">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>

</style>
