import http from '@/utils/http';
import type { VideoData } from '@/types/form/video';

export const postVideo = (data: VideoData): Promise<VideoData> => {
    return http.post('/video/add', data);
};