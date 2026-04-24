<script setup lang="ts">
import { computed } from 'vue';

import PartName from '../module/PartName.vue';
import SkillPanel from '../module/SkillPanel.vue';
import SkillDetail from '../module/SkillDetail.vue';
import type { RoleSkill, OneSkill } from '@/types';

const { skillData } = defineProps<{
  skillData: RoleSkill
}>()

const firSkill = computed((): OneSkill => [
  skillData.firstIncantation, skillData.firstSkill, skillData.secondSkill, skillData.thirdSkill
]);
const secSkill = computed((): OneSkill => [
  skillData.secondIncantation, skillData.fourthSkill, skillData.fifthSkill, skillData.sixthSkill
])
const thiSkill = computed((): [string, string] => skillData.thirdIncantation);
</script>

<template>
  <div class="container" v-if="skillData">
    <PartName :chinese="'神秘术'" :english="'incantation'" />
    <SkillPanel :skill-data="firSkill" />
    <SkillPanel :skill-data="secSkill" />
    <!-- sec_floor -->
    <div class="ultimate">
      <div class="ultimate-img-box">
        <img :src="thiSkill?.[0]" alt="" class="ultimate-img">
      </div>
      <div class="ultimate-info">
        <SkillDetail :data="skillData?.seventhSkill" :type="thiSkill?.[1]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.ultimate {
  display: flex;
  margin-bottom: 20px;
}

.ultimate-img-box {
  padding-right: 1%;
}

.ultimate-img {
  width: 144px;
}

.ultimate-info {
  width: 100%;
}
</style>
