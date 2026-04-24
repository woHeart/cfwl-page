<script setup lang="ts">
const { story } = defineProps<{
  story: [string, string, string]
}>();
</script>

<template>
  <div class="story-image-container">
    <img :src="story[0]" alt="Story" class="story-image" />
    <div class="overlay">
      <div class="overlay-top">{{ story[1] }}</div>
      <div class="overlay-bottom">{{ story[2] }}</div>
    </div>
  </div>
</template>

<style scoped>
.story-image-container {
  position: relative;
  overflow: hidden;
}

.story-image {
  width: 100%;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  opacity: 0;
  transition: 0.3s;
}

.story-image-container:hover .overlay {
  opacity: 1;
}

.overlay-top {
  border-bottom: #fff 1px solid;
  position: absolute;
  left: 10%;
  transform: translateY(-60%);
  color: #fff;
  font-size: 50px;
  font-weight: bold;
  transition:  0.4s;
}

.story-image-container:hover .overlay-top{
  transform: translateY(25%);
}

.overlay-bottom {
  position: absolute;
  right: 0%;
  bottom: 69%;
  transform: translateX(100%);
  color: #fff;
  font-size: 18px;
  transition:0.4s;
  white-space: nowrap;
}

.story-image-container:hover .overlay-bottom {
  right: 86%;
}
</style>
