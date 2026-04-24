import http from '@/utils/http.js'
import type { RoleDetailed, WeaponDetail, RoleParams, WeaponParams} from '@/types'

export const getRoleDetailed = (rolename: string) => {
  return http.get<RoleDetailed, RoleParams>('/roledetailed', { rolename })
}

export const getWeaponDetailed = (weaponname: string) => {
  return http.get<WeaponDetail, WeaponParams>('/weapondetailed', { weaponname })
}
