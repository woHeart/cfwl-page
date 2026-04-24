<script setup lang="ts">
const { chinese, english } = defineProps<{
  chinese: string,
  english: string,
}>()
</script>

<template>
  <div class="header">
    <span class="chinese">{{ chinese }}</span>
    <span class="english">{{ english }}</span>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  width: 100%;
  padding-bottom: 6px;
  margin-bottom: 16px;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.65);
  align-items: center;
}

.chinese {
  padding-right: 6px;
  font-weight: bold;
  font-size: 22px;
  font-family: '宋体';
  border-right: 1px solid;
}

.english {
  padding-left: 6px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
