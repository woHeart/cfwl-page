<script setup>
import logo from '@/assets/Other/Logo.png'
</script>

<template>
  <header class="header">
    <img class="logo" :src="logo" alt="Logo" />
    <ul class="towhere">
      <li>
        <router-link to="/" class="towhere-item">首页</router-link>
      </li>
      <li>
        <router-link to="/illustration" class="towhere-item">图鉴</router-link>
      </li>
      <li>
        <router-link to="/gallery" class="towhere-item">影音</router-link>
      </li>
      <li>
        <router-link to="/theword" class="towhere-item">故事</router-link>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.header {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 0 8% 0 5%;
  height: 90px;
}

.logo {
  height: 80px;
}

.towhere {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}

.towhere-item {
  font-family: '宋体';
  margin-left: 80px;
  color: #1f1f1f;
  text-decoration: none;
  font-size: 25px;
  transition: color 0.2s;
}

.towhere-item:hover {
  color: #1890ff;
}
</style>
