import http from '@/utils/http';
import type { AtlasData } from '@/types/form/atlas';

export const postAtlas = (data: AtlasData): Promise<AtlasData> => {
    return http.post('/atlas/add', data);
};