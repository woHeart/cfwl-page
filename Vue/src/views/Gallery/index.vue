<script setup>
import Video from './components/Video.vue'
import Wallpaper from './components/Wallpaper.vue';
</script>

<template>
  <div>
    <Video />
    <Wallpaper />
  </div>

</template>

<style scoped>
div {
  display: flex;
  margin: 50px 140px 0 120px;
  justify-content: space-between;
}
</style>
