import http from '@/utils/http';
import type { WeaponBaseData } from '@/types/form/weaponbase';
import type { WeaponDetData } from '@/types/form/weapondetail';

export const postWeaponBase = (data: WeaponBaseData): Promise<WeaponBaseData> => {
    return http.post('/weaponBase/add', data);
};

export const postWeaponDet = (data: WeaponDetData): Promise<WeaponDetData> => {
    return http.post('/weaponDetailed/add', data);
};