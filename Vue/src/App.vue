<script setup>

</script>

<template>
  <!-- 一级路由出口 -->
  <RouterView/>
</template>

<style>
body{
  overflow-y: scroll;
  background-color: #f5f5f5;
}
::-webkit-scrollbar {
  width: 7px; /* 纵向滚动条宽度 */
}

::-webkit-scrollbar-track {
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1; /* 滚动条滑块颜色 */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8; /* 滑块 hover 状态颜色 */
}

</style>
