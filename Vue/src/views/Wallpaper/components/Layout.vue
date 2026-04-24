<script setup>
import PartName from './PartName.vue';
import ImgBox from './ImgBox.vue';
</script>

<template>
  <div class="center">
    <header>
      <PartName />
    </header>
    <main>
      <ImgBox />
    </main>
    <el-backtop :bottom="100">
      <el-icon>
        <IEpArrowUpBold />
      </el-icon>
    </el-backtop>
  </div>
</template>
