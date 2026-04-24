import http from '@/utils/http'
import type { RoleCard, WeaponCard } from '@/types'

export const getRoleBase = () => {
  return http.get<RoleCard[]>('/rolebase')
}

export const getWeaponBase = () => {
  return http.get<WeaponCard[]>('/weaponbase')
}
