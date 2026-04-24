<script setup lang="ts">
const { chinese, english } = defineProps<{
  chinese: string,
  english: string
}>();
</script>

<template>
  <div class="detail" :data-subtitle=english>
    {{ chinese }}
  </div>
</template>

<style scoped>
.detail {
  font-size: 1.2em;
  height: 1.8em;
  line-height: 1.8em;
  margin-top: .6em;
  color: #fff;
  font-weight: 500;
  text-align: start;
}
.detail::before {
  display: block;
  position: relative;
  bottom: -1.7em;
  content: "";
  height: .08em;
  background: linear-gradient(to right, #4e4e4ee4, #4e4e4ee4 35%, transparent 35%, transparent calc(35% + 5px), #4e4e4ee4 calc(35% + 5px), #4e4e4ee4 calc(35% + 15px), transparent calc(35% + 15px), transparent calc(35% + 20px), #4e4e4ee4 calc(35% + 20px));
}
.detail::after {
  content: attr(data-subtitle);
  font-size: .5em;
  font-weight: 300;
  opacity: .5;
  padding-left: .5em;
  letter-spacing: 3px;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}
</style>
