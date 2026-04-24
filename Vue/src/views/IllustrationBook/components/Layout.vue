<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { RoleCard, WeaponCard } from '@/types';
import { getRoleBase, getWeaponBase } from '@/apis/illustration'

import Role from './Role.vue';
import Weapon from './Weapon.vue';
import { TabsInstance, type TabsPaneContext } from 'element-plus';

const tabPosition = ref<TabsInstance['tabPosition']>('left')
const roleInfo = ref<RoleCard[]>()
const weaponInfo = ref<WeaponCard[]>()

const isWeaponTab = ref<boolean>(false)
const handleTabClick = (tab: TabsPaneContext) => {
  if (tab.props.label === '心相') {
    isWeaponTab.value = true
  }
}

const getRoleBaseFn = async (): Promise<void> => {
  try {
    roleInfo.value = await getRoleBase()
  } catch (error) {
    console.log('获取角色信息失败', error)
  }
}
const getWeaponBaseFn = async (): Promise<void> => {
  try {
    weaponInfo.value = await getWeaponBase()
  } catch (error) {
    console.log('获取心相信息失败', error)
  }
}

onMounted(() => {
  getRoleBaseFn()
  getWeaponBaseFn()
})
</script>

<template>
  <el-tabs :tab-position="tabPosition" class="my-unique-tabs" @tab-click="handleTabClick">
    <el-tab-pane label="角色" class="role-box">
      <RouterLink class="role" v-for="(item, idx) in roleInfo"
        :to="{ path: '/roleinfo', query: { name: item.name.split('<br>')[0], career: item.career } }" :key="idx">
        <Role :roleData="item"/>
      </RouterLink>
    </el-tab-pane>
    <el-tab-pane label="心相" class="weapon-box">
      <RouterLink class="weapon" v-for="(item, idx) in weaponInfo"
        :to="{ path: '/weaponinfo', query: { name: item.name } }" :key="idx">
        <Weapon :weaponData="item" :isWeaponTab/>
      </RouterLink>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.my-unique-tabs ::v-deep .el-tabs__item {
  padding: 0 20px 0 0;
}

.my-unique-tabs ::v-deep .el-tabs__header {
  margin-right: 20px;
}

.role {
  width: 8%;
  height: 242px;
  margin: 1%;
}

.weapon {
  width: 9%;
  height: 120px;
  margin-right: 1%;
  margin-bottom: 1%;
}

.role-box {
  display: flex;
  flex-wrap: wrap;
}

.weapon-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
