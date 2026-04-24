import http from '@/utils/http';
import type { RoleBaseData } from '@/types/form/rolebase';
import type { RoleDetData } from '@/types/form/roledetail';

export const postRoleBase = (data: RoleBaseData): Promise<RoleBaseData> => {
    return http.post('/roleBase/add', data);
};

export const postRoleDet = (data: RoleDetData): Promise<RoleDetData> => {
    return http.post('/roleDetailed/add', data);
};