import http from '@/utils/http';
import type { MusicData } from '@/types/form/music';

export const postMusic = (data: MusicData): Promise<MusicData> => {
    return http.post('/music/add', data);
};