<script setup lang="ts">
import Positioning from './Positioning.vue';
import Profile from './Profile.vue';
import Img from './Img.vue';
import Inherit from './Inherit.vue'
import Protrait from './Protrait.vue';
import Incantation from './Incantation.vue';

import { computed } from 'vue';
import type { RoleBase, RoleDetailed, RoleImprove, RoleSkill } from '@/types';

const { roledetailed } = defineProps<{
  roledetailed: RoleDetailed
}>()

const baseInfo = computed((): RoleBase => roledetailed.baseData);
const improveInfo = computed((): RoleImprove => roledetailed.improveData);
const skillInfo = computed((): RoleSkill => roledetailed.skillData);
</script>

<template>
  <div class="page">
    <!-- 角色基础信息 -->
    <div class="role-info">
      <div class="role-info-text">
        <Positioning :characterData="baseInfo" />
        <Profile :RoleBaseDic="baseInfo?.infoDictionary" />
      </div>
      <div class="role-info-img">
        <Img :roleImgData="baseInfo" />
      </div>
    </div>

    <!-- 洞悉、塑造信息 -->
    <div class="character">
      <div class="inherit">
        <Inherit :inheritData="improveInfo" />
      </div>
      <div class="portrait">
        <Protrait :portraitData="improveInfo" />
      </div>
    </div>

    <!-- 技能信息 -->
    <Incantation :skillData="skillInfo" />
  </div>

</template>

<style>
.page {
  margin: 0 2% 0 5%;
}

.role-info {
  display: flex;
  padding-bottom: 40px;
}

.role-info-text {
  margin-right: 2%;
  width: 46.39%;
}

.role-info-img {
  margin-left: 5.22%;
  display: flex;
  flex: 1;
}

.character {
  display: flex;
  padding-bottom: 20px;
}

.inherit {
  margin-right: 2%;
  width: 46.39%;
}

.portrait {
  margin-left: 5.22%;
  display: flex;
  flex: 1;
}
</style>
