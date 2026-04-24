import http from '@/utils/http';

export interface BannerItem {
    url: string;
}

export const getBanner = (): Promise<BannerItem[]> => {
    return http.get('/banner');
};